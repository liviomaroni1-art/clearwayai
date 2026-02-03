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
  if (!origin) return false;
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
    const confirmationEmailResponse = await resend.emails.send({
      from: "Clearway AI <noreply@clearwayai.co>",
      to: [formData.email],
      subject: "We received your message - Clearway AI",
      html: `
        <h1>Thank you for reaching out, ${safeName}!</h1>
        
        <p>We've received your inquiry about <strong>${safeService}</strong> and our team will get back to you within 24 hours (usually much faster).</p>
        
        <p>In the meantime, here's a quick summary of what you shared:</p>
        <ul>
          <li><strong>Service:</strong> ${safeService}</li>
          <li><strong>Term:</strong> ${safeTerm === "36-months" ? "36 Months (with discount)" : "Monthly"}</li>
          <li><strong>Estimated Loss:</strong> ${safeEstimatedLoss}</li>
          <li><strong>Business Type:</strong> ${safeBusinessType}</li>
        </ul>
        
        <p>If you have any urgent questions, feel free to call us directly.</p>
        
        <p>Looking forward to helping you automate your business!</p>
        
        <p>Best regards,<br>
        The Clearway AI Team</p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">
          Clearway AI | Freienbach, Switzerland<br>
          <a href="mailto:hello@clearwayai.co">hello@clearwayai.co</a>
        </p>
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
