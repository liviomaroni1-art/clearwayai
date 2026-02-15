import { supabase } from "@/integrations/supabase/client";

type EventName =
  | "cta_click"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "signup_step1_complete"
  | "signup_step2_complete"
  | "demo_call_click"
  | "pricing_view"
  | "faq_expand"
  | "exit_popup_shown"
  | "exit_popup_submit"
  | "page_view";

type EventCategory = "cta" | "form" | "engagement" | "navigation";

interface TrackEventOptions {
  event_name: EventName;
  event_category?: EventCategory;
  metadata?: Record<string, string | number | boolean>;
}

// Generate a simple session ID persisted for the browser session
function getSessionId(): string {
  const key = "cw_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

/**
 * Fire-and-forget analytics event tracking.
 * Never throws — silently logs errors to console.
 */
export function trackEvent({ event_name, event_category = "cta", metadata = {} }: TrackEventOptions) {
  try {
    supabase.functions.invoke("track-event", {
      body: {
        event_name,
        event_category,
        page_path: window.location.pathname,
        metadata,
        session_id: getSessionId(),
      },
    }).catch((err) => console.warn("[analytics]", err));
  } catch {
    // silently fail — analytics should never break the app
  }
}
