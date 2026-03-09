import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  if (!origin) return true;
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
}

function getCorsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

const escapeHtml = (text: string): string => {
  if (!text) return '';
  const map: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  timezone: string;
  callVolume: string;
  preferredContact: string;
  message: string;
  formType?: "demo" | "signup";
  company?: string;
  estimatedLoss?: string;
  service?: string;
  term?: string;
  plan?: string;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 3;

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  record.count++;
  return true;
}

// ── Email templates ──

function buildDemoSalesEmail(s: Record<string, string>) {
  return {
    subject: `New Demo Request: ${s.name} – ${s.businessName || s.businessType}`,
    html: `
      <h2>New Demo Request</h2>
      <h3>Contact Details</h3>
      <ul>
        <li><strong>Name:</strong> ${s.name}</li>
        <li><strong>Business:</strong> ${s.businessName || "Not provided"}</li>
        <li><strong>Email:</strong> ${s.email}</li>
        <li><strong>Phone:</strong> ${s.phone || "Not provided"}</li>
        <li><strong>Website:</strong> ${s.website || "Not provided"}</li>
      </ul>
      <h3>Business Information</h3>
      <ul>
        <li><strong>Industry:</strong> ${s.businessType}</li>
        <li><strong>Country / Time Zone:</strong> ${s.timezone || "Not provided"}</li>
        <li><strong>Est. Calls/Month:</strong> ${s.callVolume || "Not provided"}</li>
        <li><strong>Preferred Contact:</strong> ${s.preferredContact === "phone" ? "📞 Phone" : "📧 Email"}</li>
      </ul>
      <h3>Call Challenges</h3>
      <p>${s.message}</p>
      <hr>
      <p><em>Submitted via the Clearway AI demo request form.</em></p>
    `,
  };
}

function buildSignupSalesEmail(s: Record<string, string>) {
  return {
    subject: `New Account Signup: ${s.name} – ${s.email}`,
    html: `
      <h2>New Account Signup</h2>
      <h3>Account Details</h3>
      <ul>
        <li><strong>Name:</strong> ${s.name}</li>
        <li><strong>Email:</strong> ${s.email}</li>
        <li><strong>Business:</strong> ${s.businessName || "Not provided"}</li>
        <li><strong>Industry:</strong> ${s.businessType || "Not provided"}</li>
        <li><strong>Phone:</strong> ${s.phone || "Not provided"}</li>
        <li><strong>Time Zone:</strong> ${s.timezone || "Not provided"}</li>
      </ul>
      <h3>Service Preferences</h3>
      <ul>
        <li><strong>Service Interest:</strong> ${s.service || "Not selected"}</li>
        <li><strong>Preferred Plan:</strong> ${s.plan || "Not selected"}</li>
        <li><strong>Commitment Term:</strong> ${s.term || "Not selected"}</li>
        <li><strong>Daily Call Volume:</strong> ${s.callVolume || "Not provided"}</li>
      </ul>
      <h3>Notes</h3>
      <p>${s.message || "No additional notes"}</p>
      <hr>
      <p><em>Submitted via the Clearway AI account signup form.</em></p>
    `,
  };
}

function buildDemoConfirmationEmail(firstName: string, logoUrl: string) {
  return {
    subject: "Your Demo Request – Clearway AI",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="margin: 0 0 16px 0; font-size: 15px; color: #1a1a1a;">Hey ${firstName},</p>
        
        <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
          Thank you for requesting a demo of Clearway AI. We've received your details and will be in touch soon.
        </p>

        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1a1a1a;">Here's what happens next:</p>
        <ol style="margin: 0 0 20px 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #333;">
          <li><strong>Call flow review</strong> — We review your current call setup and identify gaps.</li>
          <li><strong>15-minute walkthrough</strong> — You get a personalized demo tailored to your business.</li>
          <li><strong>Go live in ~72 hours</strong> — No tech work on your end.</li>
        </ol>

        <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #555;">
          In the meantime, feel free to reach us at <strong>+41 76 471 56 78</strong> if you have any questions.
        </p>
        
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #666; font-style: italic;">
          This message was composed by Clearways AI Support Agent.
        </p>
        
        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
          --<br>
          <strong>Livio</strong><br>
          <strong>Clearway AI</strong><br>
          <em style="color: #666;">AI Receptionists That Never Miss a Call</em>
        </p>
        
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #1a1a1a;">
          +41 76 471 56 78 (CH)<br>
          <a href="mailto:hello@clearwayai.co" style="color: #0F766E;">Hello@clearwayai.co</a><br>
          <a href="https://clearwayai.co" style="color: #0F766E;">Clearway AI</a>
        </p>
        
        <img src="${logoUrl}" alt="Clearway AI" style="height: 50px; width: auto; margin-top: 16px;" />
      </div>
    `,
  };
}

function buildSignupConfirmationEmail(firstName: string, logoUrl: string) {
  return {
    subject: "Welcome to Clearway AI – Verify Your Email",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="margin: 0 0 16px 0; font-size: 15px; color: #1a1a1a;">Hey ${firstName},</p>
        
        <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
          Welcome to Clearway AI! Your account has been created and is pending email verification.
        </p>

        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1a1a1a;">Here's what happens next:</p>
        <ol style="margin: 0 0 20px 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #333;">
          <li><strong>Verify your email</strong> — Check your inbox for a separate verification link.</li>
          <li><strong>Access your portal</strong> — Once verified, sign in to your Client Hub dashboard.</li>
          <li><strong>Get started</strong> — Explore your tools, settings, and call management features.</li>
        </ol>

        <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #555;">
          If you have any questions or need help getting set up, don't hesitate to reach out.
        </p>
        
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #666; font-style: italic;">
          This message was composed by Clearways AI Support Agent.
        </p>
        
        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
          --<br>
          <strong>Livio</strong><br>
          <strong>Clearway AI</strong><br>
          <em style="color: #666;">AI Receptionists That Never Miss a Call</em>
        </p>
        
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #1a1a1a;">
          +41 76 471 46 78 (CH)<br>
          <a href="mailto:hello@clearwayai.co" style="color: #0F766E;">Hello@clearwayai.co</a><br>
          <a href="https://clearwayai.co" style="color: #0F766E;">Clearway AI</a>
        </p>
        
        <img src="${logoUrl}" alt="Clearway AI" style="height: 50px; width: auto; margin-top: 16px;" />
      </div>
    `,
  };
}

// ── Main handler ──

Deno.serve(async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!isAllowedOrigin(origin)) {
      console.warn(`Request from unauthorized origin: ${origin}`);
      return new Response(
        JSON.stringify({ error: "Unauthorized request origin" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const formData: ContactFormData = await req.json();
    const formType = formData.formType || "demo"; // Default to demo for backward compat

    // Validate required fields
    if (!formData.name || !formData.email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate field lengths
    if (formData.name.length > 100 || 
        formData.email.length > 255 || 
        (formData.phone && formData.phone.length > 20) ||
        (formData.message && formData.message.length > 1000) ||
        (formData.businessName && formData.businessName.length > 100) ||
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
      try { new URL(formData.website); } catch {
        return new Response(
          JSON.stringify({ error: "Invalid website URL" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Escape all user inputs
    const safe: Record<string, string> = {
      name: escapeHtml(formData.name),
      businessName: escapeHtml(formData.businessName || formData.company || ""),
      email: escapeHtml(formData.email),
      phone: escapeHtml(formData.phone || ""),
      website: escapeHtml(formData.website || ""),
      businessType: escapeHtml(formData.businessType || ""),
      timezone: escapeHtml(formData.timezone || ""),
      callVolume: escapeHtml(formData.callVolume || formData.estimatedLoss || ""),
      preferredContact: escapeHtml(formData.preferredContact || "email"),
      message: escapeHtml(formData.message || "").replace(/\n/g, "<br>"),
      service: escapeHtml(formData.service || ""),
      plan: escapeHtml(formData.plan || ""),
      term: escapeHtml(formData.term || ""),
    };

    const logoUrl = "https://clearwayai.co/email-logo.jpg";
    const firstName = escapeHtml(formData.name.split(' ')[0]);

    // Build emails based on form type
    const salesEmail = formType === "signup"
      ? buildSignupSalesEmail(safe)
      : buildDemoSalesEmail(safe);

    const confirmationEmail = formType === "signup"
      ? buildSignupConfirmationEmail(firstName, logoUrl)
      : buildDemoConfirmationEmail(firstName, logoUrl);

    // Send sales notification
    const salesEmailResponse = await resend.emails.send({
      from: "Clearway AI <hello@clearwayai.co>",
      to: ["hello@clearwayai.co"],
      subject: salesEmail.subject,
      html: salesEmail.html,
    });
    console.log("Sales notification email sent:", salesEmailResponse);

    // Send confirmation to customer
    const confirmationEmailResponse = await resend.emails.send({
      from: "Clearway AI <hello@clearwayai.co>",
      to: [formData.email],
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });
    console.log("Confirmation email sent:", confirmationEmailResponse);

    // If signup, notify n8n webhook for approval and ban user until approved
    if (formType === "signup") {
      try {
        const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
        const supabaseAdmin = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );

        // Find the user by email and ban them until approved
        const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
        const targetUser = userList?.users?.find((u: any) => u.email === formData.email);
        if (targetUser) {
          await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
            ban_duration: "876000h", // ~100 years, effectively permanent until approved
          });
          console.log("User banned pending approval:", targetUser.id);
        }

        // Send user info to n8n webhook for approval
        const webhookPayload = {
          user_id: targetUser?.id || "unknown",
          name: formData.name,
          email: formData.email,
          businessName: formData.businessName || formData.company || "",
          businessType: formData.businessType || "",
          phone: formData.phone || "",
          timezone: formData.timezone || "",
          service: formData.service || "",
          plan: formData.plan || "",
          term: formData.term || "",
          callVolume: formData.callVolume || "",
          message: formData.message || "",
          submitted_at: new Date().toISOString(),
        };

        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), 15000);
        try {
          const n8nSecret = Deno.env.get("N8N_WEBHOOK_SECRET");
          const webhookResponse = await fetch("https://livio2895.app.n8n.cloud/webhook/approval-request-for-new-users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(n8nSecret ? { "X-Webhook-Secret": n8nSecret } : {}),
            },
            body: JSON.stringify(webhookPayload),
            signal: abortController.signal,
          });
          console.log("n8n webhook response:", webhookResponse.status);
        } catch (fetchErr) {
          console.warn("n8n webhook timed out or failed (non-blocking):", fetchErr);
        } finally {
          clearTimeout(timeoutId);
        }
      } catch (webhookError) {
        console.error("Error sending to n8n webhook:", webhookError);
        // Don't fail the whole request if webhook fails
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Unable to send message. Please try again or contact us directly at hello@clearwayai.co" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
