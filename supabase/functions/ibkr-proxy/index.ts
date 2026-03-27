import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

// IBKR Client Portal Gateway base URL
// Set this env var to wherever your gateway is running (e.g., https://localhost:5000)
const IBKR_GATEWAY_URL = Deno.env.get("IBKR_GATEWAY_URL") || "https://localhost:5000";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const ALLOWED_ORIGINS = [
  "https://clearwayai.co",
  "https://www.clearwayai.co",
  "https://clearwayai.lovable.app",
  "https://21a27ec4-5e52-4802-bbc7-8c425415ce9e.lovableproject.com",
  "http://localhost:8080",
  "http://localhost:5173",
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
}

function getCorsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin)
      ? origin!
      : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  };
}

// Allowed IBKR API path prefixes to prevent misuse
const ALLOWED_PATHS = [
  "/v1/api/iserver/auth/status",
  "/v1/api/iserver/reauthenticate",
  "/v1/api/tickle",
  "/v1/api/logout",
  "/v1/api/sso/validate",
  "/v1/api/portfolio/accounts",
  "/v1/api/portfolio/positions",
  "/v1/api/iserver/account",
  "/v1/api/iserver/marketdata",
  "/v1/api/iserver/contract",
  "/v1/api/iserver/secdef",
];

function isAllowedPath(path: string): boolean {
  return ALLOWED_PATHS.some((allowed) => path.startsWith(allowed));
}

async function verifyUser(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) return null;
  return user.id;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify origin
    if (!isAllowedOrigin(origin)) {
      return new Response(
        JSON.stringify({ error: "Unauthorized origin" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify authenticated Supabase user
    const userId = await verifyUser(req);
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse the proxied path from the request body
    const body = await req.json();
    const { path, method = "GET", payload } = body as {
      path: string;
      method?: string;
      payload?: unknown;
    };

    if (!path || typeof path !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing 'path' parameter" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate the requested IBKR API path
    if (!isAllowedPath(path)) {
      return new Response(
        JSON.stringify({ error: `Path not allowed: ${path}` }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Forward request to IBKR Client Portal Gateway
    const gatewayUrl = `${IBKR_GATEWAY_URL}${path}`;
    const fetchOptions: RequestInit = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "ClearwayAI/1.0",
      },
    };

    if (payload && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      fetchOptions.body = JSON.stringify(payload);
    }

    console.log(`[IBKR Proxy] ${method} ${path} (user: ${userId})`);

    const gatewayResponse = await fetch(gatewayUrl, fetchOptions);
    const responseText = await gatewayResponse.text();

    // Try to parse as JSON, fall back to text
    let responseBody: unknown;
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = { raw: responseText };
    }

    return new Response(JSON.stringify(responseBody), {
      status: gatewayResponse.status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("[IBKR Proxy] Error:", error);

    const isConnectionError =
      error instanceof TypeError && error.message.includes("connect");

    return new Response(
      JSON.stringify({
        error: isConnectionError
          ? "Cannot reach IBKR Gateway. Ensure the Client Portal Gateway is running."
          : "Internal proxy error",
      }),
      {
        status: isConnectionError ? 502 : 500,
        headers: { "Content-Type": "application/json", ...getCorsHeaders(origin) },
      }
    );
  }
};

Deno.serve(handler);
