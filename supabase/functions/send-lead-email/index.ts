import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: LeadEmailRequest = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "Clearway AI <noreply@clearwayai.co>",
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

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
            <p>Clearway AI - AI-Powered Marketing, Made Clear.</p>
            <p style="font-size: 12px;">You're receiving this because you downloaded our ROI Calculator.</p>
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
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

Deno.serve(handler);
