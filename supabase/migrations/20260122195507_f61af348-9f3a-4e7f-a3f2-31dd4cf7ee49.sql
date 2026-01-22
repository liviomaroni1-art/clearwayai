-- Create leads table for exit-intent popup captures
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'exit_popup',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (no auth required for lead capture)
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Only allow reading via edge functions (no direct read access)
CREATE POLICY "No direct read access"
ON public.leads
FOR SELECT
USING (false);