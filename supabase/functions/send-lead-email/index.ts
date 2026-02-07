import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Create admin client with service role key for bypassing RLS
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://clearwayai.co',
  'https://www.clearwayai.co',
  'https://clearwayai.lovable.app',
  'https://id-preview--21a27ec4-5e52-4802-bbc7-8c425415ce9e.lovable.app',
  'https://21a27ec4-5e52-4802-bbc7-8c425415ce9e.lovableproject.com',
  'http://localhost:8080',
  'http://localhost:5173',
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
}

function getCorsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

interface LeadEmailRequest {
  email: string;
  source?: string;
}

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 300000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per 5 minutes per IP

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate origin
    if (!isAllowedOrigin(origin)) {
      console.warn(`Request from unauthorized origin: ${origin}`);
      return new Response(
        JSON.stringify({ error: "Unauthorized request origin" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { email, source = 'exit_popup' }: LeadEmailRequest = await req.json();

    // Comprehensive email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || email.length > 255 || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate source to prevent injection
    const allowedSources = ['exit_popup', 'contact_form', 'newsletter'];
    const sanitizedSource = allowedSources.includes(source) ? source : 'exit_popup';

    // Save lead to database using service role (bypasses RLS)
    // This happens AFTER rate limiting, so spam is prevented
    const { error: dbError } = await supabaseAdmin
      .from('leads')
      .insert({ email, source: sanitizedSource });

    if (dbError) {
      // Check for duplicate email (unique constraint violation)
      if (dbError.code === '23505') {
        console.log("Duplicate lead email:", email);
        // Still send email for duplicates - they might want it again
      } else {
        console.error("Database error saving lead:", dbError);
        return new Response(
          JSON.stringify({ error: "Unable to save your information. Please try again later." }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    const emailResponse = await resend.emails.send({
      from: "Clearway AI <hello@clearwayai.co>",
      to: [email],
      subject: "🎁 Your Free ROI Calculator is Here!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0F766E; margin-bottom: 10px;">Your ROI Calculator</h1>
            <p style="color: #666; font-size: 16px;">Discover how much revenue you're losing to missed calls</p>
          </div>

          <div style="background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%); border-radius: 12px; padding: 30px; margin-bottom: 30px;">
            <h2 style="color: #0F766E; margin-top: 0;">📊 Quick ROI Calculator</h2>
            
            <p><strong>Step 1:</strong> Count your missed calls per week</p>
            <p><strong>Step 2:</strong> Multiply by your average booking value</p>
            <p><strong>Step 3:</strong> That's your weekly revenue loss!</p>
            
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0F766E;">Example Calculation:</h3>
              <ul style="padding-left: 20px;">
                <li>15 missed calls/week × $150 avg booking = <strong style="color: #dc2626;">$2,250 lost/week</strong></li>
                <li>Monthly loss: <strong style="color: #dc2626;">$9,000+</strong></li>
                <li>AI Receptionist cost: <strong style="color: #16a34a;">~$1,500/month</strong></li>
                <li>Your net gain: <strong style="color: #16a34a;">$7,500+/month</strong></li>
              </ul>
            </div>
          </div>

          <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #f59e0b;">
            <h3 style="margin-top: 0; color: #92400e;">💡 Did You Know?</h3>
            <p style="margin-bottom: 0;">62% of calls to service businesses go unanswered. Each missed call costs you an average of $150-$500 in potential revenue.</p>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://clearwayai.co/#contact" style="display: inline-block; background: #0F766E; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
              Get Your Free Strategy Call →
            </a>
            <p style="color: #666; font-size: 14px; margin-top: 15px;">See exactly how AI can recover your lost revenue</p>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #1a1a1a; font-size: 14px;">
            <p style="margin: 0 0 16px 0;">
              --<br>
              <strong>Livio</strong><br>
              <strong>Clearway AI</strong><br>
              <em style="color: #666;">AI Receptionists That Never Miss a Call</em>
            </p>
            
            <p style="margin: 0 0 16px 0;">
              +41 76 471 46 78 (CH)<br>
              <a href="mailto:hello@clearwayai.co" style="color: #0F766E;">Hello@clearwayai.co</a><br>
              <a href="https://clearwayai.co" style="color: #0F766E;">Clearway AI</a>
            </p>
            
            <img src="https://clearwayai.lovable.app/email-logo.jpg" alt="Clearway AI" style="height: 50px; width: auto; margin-top: 16px;" />
            
            <p style="font-size: 12px; color: #666; margin-top: 16px;">You're receiving this because you downloaded our ROI Calculator.</p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Lead email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending lead email:", error);
    return new Response(
      JSON.stringify({ error: "Unable to send email. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...getCorsHeaders(origin) } }
    );
  }
};

Deno.serve(handler);
