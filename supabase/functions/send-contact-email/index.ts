import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Validate allowed origins
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
  // Allow null origin for edge function invocations (testing)
  if (!origin) return true;
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
}

function getCorsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// HTML escape function to prevent XSS in emails
const escapeHtml = (text: string): string => {
  if (!text) return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  website: string;
  businessType: string;
  estimatedLoss: string;
  service: string;
  term: string;
  message: string;
}

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per minute per IP

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

Deno.serve(async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
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

    const formData: ContactFormData = await req.json();

    // Validate required fields with length limits
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate field lengths
    if (formData.name.length > 100 || 
        formData.email.length > 255 || 
        formData.phone.length > 20 ||
        formData.message.length > 1000 ||
        (formData.company && formData.company.length > 100) ||
        (formData.website && formData.website.length > 255)) {
      return new Response(
        JSON.stringify({ error: "Field length exceeds maximum allowed" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate website URL if provided
    if (formData.website) {
      try {
        new URL(formData.website);
      } catch {
        return new Response(
          JSON.stringify({ error: "Invalid website URL" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Escape all user inputs for HTML email templates
    const safeName = escapeHtml(formData.name);
    const safeEmail = escapeHtml(formData.email);
    const safePhone = escapeHtml(formData.phone);
    const safeCompany = escapeHtml(formData.company);
    const safeWebsite = escapeHtml(formData.website);
    const safeBusinessType = escapeHtml(formData.businessType);
    const safeService = escapeHtml(formData.service);
    const safeTerm = escapeHtml(formData.term);
    const safeEstimatedLoss = escapeHtml(formData.estimatedLoss);
    const safeMessage = escapeHtml(formData.message).replace(/\n/g, "<br>");

    // Send notification email to sales team
    const salesEmailResponse = await resend.emails.send({
      from: "Clearway AI <noreply@clearwayai.co>",
      to: ["hello@clearwayai.co"],
      subject: `New Lead: ${safeName} - ${safeService}`,
      html: `
        <h2>New Contact Form Submission</h2>
        
        <h3>Contact Details</h3>
        <ul>
          <li><strong>Name:</strong> ${safeName}</li>
          <li><strong>Email:</strong> ${safeEmail}</li>
          <li><strong>Phone:</strong> ${safePhone}</li>
          <li><strong>Company:</strong> ${safeCompany || "Not provided"}</li>
          <li><strong>Website:</strong> ${safeWebsite || "Not provided"}</li>
        </ul>
        
        <h3>Business Information</h3>
        <ul>
          <li><strong>Business Type:</strong> ${safeBusinessType}</li>
          <li><strong>Service Interest:</strong> ${safeService}</li>
          <li><strong>Preferred Term:</strong> ${safeTerm === "36-months" ? "36 Months (20% off + waived setup)" : "Monthly"}</li>
          <li><strong>Estimated Monthly Loss:</strong> ${safeEstimatedLoss}</li>
        </ul>
        
        <h3>Message</h3>
        <p>${safeMessage}</p>
        
        <hr>
        <p><em>This lead was submitted via the Clearway AI contact form.</em></p>
      `,
    });

    console.log("Sales notification email sent:", salesEmailResponse);

    // Send confirmation email to the customer
    const logoUrl = "https://clearwayai.co/email-logo.jpg";
    
    const confirmationEmailResponse = await resend.emails.send({
      from: "Clearway AI <noreply@clearwayai.co>",
      to: [formData.email],
      subject: `${safeService} - Clearway AI`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a1628; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a1628;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background: linear-gradient(135deg, #0f2942 0%, #0a1628 100%); border-radius: 16px; border: 1px solid rgba(45, 212, 191, 0.2);">
                  <tr>
                    <td style="padding: 40px 32px;">
                      <!-- Header -->
                      <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                        ${safeService}
                      </h1>
                      <p style="margin: 0 0 32px 0; font-size: 14px; color: #94a3b8;">
                        Your inquiry has been received
                      </p>
                      
                      <!-- Main content -->
                      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                        Hi ${safeName},
                      </p>
                      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                        Thank you for reaching out! We're excited to learn more about your business and how we can help you never miss another call.
                      </p>
                      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                        A member of our team will be in touch within <strong style="color: #2dd4bf;">24-48 hours on weekdays</strong> to discuss your needs and answer any questions.
                      </p>
                      
                      <!-- Summary box -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(45, 212, 191, 0.05); border-radius: 12px; border: 1px solid rgba(45, 212, 191, 0.15); margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 20px;">
                            <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #2dd4bf; text-transform: uppercase; letter-spacing: 0.5px;">
                              Your Request Summary
                            </p>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #94a3b8;">Service:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #e2e8f0; text-align: right;">${safeService}</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #94a3b8;">Term:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #e2e8f0; text-align: right;">${safeTerm === "36-months" ? "36 Months (20% off)" : "Monthly"}</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #94a3b8;">Business Type:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #e2e8f0; text-align: right;">${safeBusinessType}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                        In the meantime, feel free to reply to this email if you have any questions.
                      </p>
                      
                      <!-- Signature -->
                      <p style="margin: 0 0 4px 0; font-size: 16px; color: #e2e8f0;">
                        Talk soon,
                      </p>
                      <p style="margin: 0 0 32px 0; font-size: 16px; font-weight: 600; color: #2dd4bf;">
                        Your Clearway AI Team
                      </p>
                      
                      <!-- Divider -->
                      <hr style="border: none; border-top: 1px solid rgba(148, 163, 184, 0.2); margin: 0 0 24px 0;">
                      
                      <!-- Logo at bottom -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">
                            <img src="${logoUrl}" alt="Clearway AI" style="height: 40px; width: auto;" />
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-top: 16px;">
                            <p style="margin: 0; font-size: 12px; color: #64748b;">
                              Freienbach, Switzerland
                            </p>
                            <p style="margin: 4px 0 0 0; font-size: 12px;">
                              <a href="mailto:hello@clearwayai.co" style="color: #2dd4bf; text-decoration: none;">hello@clearwayai.co</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    // Return generic error message to prevent information leakage
    return new Response(
      JSON.stringify({ error: "Unable to send message. Please try again or contact us directly at hello@clearwayai.co" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
