import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  website: string;
  businessType: string;
  budget: string;
  service: string;
  term: string;
  message: string;
}

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send notification email to sales team
    const salesEmailResponse = await resend.emails.send({
      from: "ClearwayAI Contact Form <onboarding@resend.dev>",
      to: ["sales@clearwayai.co"],
      subject: `New Lead: ${formData.name} - ${formData.service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        
        <h3>Contact Details</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Company:</strong> ${formData.company || "Not provided"}</li>
          <li><strong>Website:</strong> ${formData.website || "Not provided"}</li>
        </ul>
        
        <h3>Business Information</h3>
        <ul>
          <li><strong>Business Type:</strong> ${formData.businessType}</li>
          <li><strong>Service Interest:</strong> ${formData.service}</li>
          <li><strong>Preferred Term:</strong> ${formData.term === "36-months" ? "36 Months (20% off + waived setup)" : "Monthly"}</li>
          <li><strong>Budget Range:</strong> ${formData.budget}</li>
        </ul>
        
        <h3>Message</h3>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
        
        <hr>
        <p><em>This lead was submitted via the ClearwayAI contact form.</em></p>
      `,
    });

    console.log("Sales notification email sent:", salesEmailResponse);

    // Send confirmation email to the customer
    const confirmationEmailResponse = await resend.emails.send({
      from: "ClearwayAI <onboarding@resend.dev>",
      to: [formData.email],
      subject: "We received your message - ClearwayAI",
      html: `
        <h1>Thank you for reaching out, ${formData.name}!</h1>
        
        <p>We've received your inquiry about <strong>${formData.service}</strong> and our team will get back to you within 24 hours (usually much faster).</p>
        
        <p>In the meantime, here's a quick summary of what you shared:</p>
        <ul>
          <li><strong>Service:</strong> ${formData.service}</li>
          <li><strong>Term:</strong> ${formData.term === "36-months" ? "36 Months (with discount)" : "Monthly"}</li>
          <li><strong>Budget:</strong> ${formData.budget}</li>
          <li><strong>Business Type:</strong> ${formData.businessType}</li>
        </ul>
        
        <p>If you have any urgent questions, feel free to call us directly.</p>
        
        <p>Looking forward to helping you automate your business!</p>
        
        <p>Best regards,<br>
        The ClearwayAI Team</p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">
          ClearwayAI | Freienbach, Switzerland<br>
          <a href="mailto:sales@clearwayai.co">sales@clearwayai.co</a>
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
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
