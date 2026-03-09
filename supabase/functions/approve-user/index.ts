import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, email } = await req.json();

    if (!user_id && !email) {
      return new Response(
        JSON.stringify({ error: "user_id or email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find user by ID or email
    let targetUserId = user_id;
    let targetEmail = email;

    if (!targetUserId && targetEmail) {
      const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
      const found = userList?.users?.find((u: any) => u.email === targetEmail);
      if (!found) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      targetUserId = found.id;
      targetEmail = found.email;
    }

    // Unban the user (set ban_duration to "none" effectively)
    const { data: updatedUser, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      targetUserId,
      {
        ban_duration: "none",
        email_confirm: true,
      }
    );

    if (updateError) {
      console.error("Error unbanning user:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to activate user account" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get user details for the email
    const userName = updatedUser?.user?.user_metadata?.full_name || "there";
    const userEmail = targetEmail || updatedUser?.user?.email;
    const firstName = userName.split(" ")[0];

    // Send approval email
    const logoUrl = "https://clearwayai.co/email-logo.jpg";
    const approvalEmailResponse = await resend.emails.send({
      from: "Clearway AI <hello@clearwayai.co>",
      to: [userEmail],
      subject: "Your Account is Now Active – Clearway AI",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="margin: 0 0 16px 0; font-size: 15px; color: #1a1a1a;">Hey ${firstName},</p>
          
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
            Great news — your Clearway AI account has been <strong>approved and activated</strong>! 🎉
          </p>

          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1a1a1a;">Here's what you can do now:</p>
          <ol style="margin: 0 0 20px 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #333;">
            <li><strong>Sign in</strong> — Head to your <a href="https://hub-clearwayai.com/login" style="color: #0F766E;">Client Hub</a> and log in with your credentials.</li>
            <li><strong>Explore your dashboard</strong> — Access call logs, settings, and management tools.</li>
            <li><strong>Get started</strong> — Our team will reach out to help configure your AI receptionist.</li>
          </ol>

          <div style="text-align: center; margin: 24px 0;">
            <a href="https://hub-clearwayai.com/login" style="display: inline-block; padding: 12px 32px; background-color: #0F766E; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">
              Sign in to Your Account →
            </a>
          </div>

          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #555;">
            If you have any questions, just reply to this email or call us at <strong>+41 76 471 56 78</strong>.
          </p>
          
          <p style="margin: 0 0 16px 0; font-size: 13px; color: #666; font-style: italic;">
            This message was composed by Clearway's AI Support Agent.
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
    });
    console.log("Approval email sent:", approvalEmailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "User approved and notified" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error in approve-user function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process approval" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
