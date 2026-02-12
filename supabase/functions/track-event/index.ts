import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
  return ALLOWED_ORIGINS.some(allowed => origin?.startsWith(allowed));
}

function getCorsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// Allowed event names to prevent abuse
const ALLOWED_EVENTS = new Set([
  "cta_click",
  "form_submit",
  "form_success",
  "form_error",
  "demo_call_click",
  "pricing_view",
  "faq_expand",
  "exit_popup_shown",
  "exit_popup_submit",
  "page_view",
]);

const ALLOWED_CATEGORIES = new Set([
  "cta",
  "form",
  "engagement",
  "navigation",
]);

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { event_name, event_category, page_path, metadata, session_id } = body;

    // Validate event name
    if (!event_name || typeof event_name !== "string") {
      return new Response(JSON.stringify({ error: "Invalid event name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ALLOWED_EVENTS.has(event_name)) {
      return new Response(JSON.stringify({ error: "Unknown event" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const category = ALLOWED_CATEGORIES.has(event_category) ? event_category : "cta";

    // Use service role to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase.from("analytics_events").insert({
      event_name: event_name.substring(0, 100),
      event_category: category,
      page_path: typeof page_path === "string" ? page_path.substring(0, 500) : null,
      metadata: metadata && typeof metadata === "object" ? metadata : {},
      session_id: typeof session_id === "string" ? session_id.substring(0, 100) : null,
    });

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Failed to track event" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Track event error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
