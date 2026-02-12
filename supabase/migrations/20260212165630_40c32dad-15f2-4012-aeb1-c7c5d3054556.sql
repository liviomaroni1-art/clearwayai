
-- Create analytics events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_category TEXT NOT NULL DEFAULT 'cta',
  page_path TEXT,
  metadata JSONB DEFAULT '{}',
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- No direct client access - all writes go through edge function
CREATE POLICY "No direct insert to analytics_events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (false);

CREATE POLICY "No direct update to analytics_events"
  ON public.analytics_events FOR UPDATE
  USING (false);

CREATE POLICY "No direct delete to analytics_events"
  ON public.analytics_events FOR DELETE
  USING (false);

-- Admins can read analytics
CREATE POLICY "Admins can read analytics_events"
  ON public.analytics_events FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Index for common queries
CREATE INDEX idx_analytics_events_name ON public.analytics_events (event_name);
CREATE INDEX idx_analytics_events_created ON public.analytics_events (created_at DESC);
CREATE INDEX idx_analytics_events_category ON public.analytics_events (event_category);
