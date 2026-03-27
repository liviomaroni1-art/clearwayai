import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * Calls the IBKR Client Portal API through the Supabase Edge Function proxy.
 * Requires an active Supabase session (user must be logged in).
 */
async function ibkrFetch<T = unknown>(
  path: string,
  method: "GET" | "POST" | "DELETE" = "GET",
  payload?: unknown
): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Not authenticated. Please log in first.");
  }

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/ibkr-proxy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        apikey: SUPABASE_KEY,
      },
      body: JSON.stringify({ path, method, payload }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `IBKR API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// --- IBKR Client Portal API Types ---

export interface AuthStatus {
  authenticated: boolean;
  competing: boolean;
  connected: boolean;
  message: string;
  MAC?: string;
  serverInfo?: { serverName: string; serverVersion: string };
}

export interface TickleResponse {
  session: string;
  ssoExpires: number;
  collission: boolean;
  iserver: { authStatus: { authenticated: boolean; competing: boolean } };
}

export interface Account {
  id: string;
  accountId: string;
  accountVan: string;
  accountTitle: string;
  displayName: string;
  accountAlias: string;
  accountStatus: number;
  currency: string;
  type: string;
  tradingType: string;
  covestor: boolean;
  parent?: { mmc: string[]; accountId: string; isMParent: boolean };
}

// --- API Methods ---

/** Check if the IBKR gateway session is authenticated */
export async function getAuthStatus(): Promise<AuthStatus> {
  return ibkrFetch<AuthStatus>("/v1/api/iserver/auth/status", "POST");
}

/**
 * Keep the session alive. Call this periodically (every ~55 seconds)
 * to prevent the session from timing out.
 */
export async function tickle(): Promise<TickleResponse> {
  return ibkrFetch<TickleResponse>("/v1/api/tickle", "POST");
}

/** Validate the SSO session */
export async function validateSSO(): Promise<{ LOGIN_TYPE: number; USER_NAME: string; RESULT: boolean }> {
  return ibkrFetch("/v1/api/sso/validate", "GET");
}

/** Trigger reauthentication (user will need to re-auth in the gateway browser) */
export async function reauthenticate(): Promise<{ message: string }> {
  return ibkrFetch("/v1/api/iserver/reauthenticate", "POST");
}

/** Log out of the IBKR gateway session */
export async function logout(): Promise<{ confirmed: boolean }> {
  return ibkrFetch("/v1/api/logout", "POST");
}

/** Get all brokerage accounts */
export async function getAccounts(): Promise<Account[]> {
  const result = await ibkrFetch<{ accounts: Account[] }>(
    "/v1/api/portfolio/accounts",
    "GET"
  );
  return result.accounts ?? [];
}
