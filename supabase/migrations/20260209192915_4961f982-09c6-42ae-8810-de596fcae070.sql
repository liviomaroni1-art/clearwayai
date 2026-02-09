
-- Drop the overly permissive INSERT policy on leads
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Replace with a restrictive policy that blocks direct inserts
-- All legitimate inserts go through edge functions using service role key (bypasses RLS)
CREATE POLICY "No direct insert to leads"
ON public.leads
FOR INSERT
WITH CHECK (false);
