-- Block anonymous/unauthenticated SELECT access to leads table
-- The "Admins can read leads" RESTRICTIVE policy applies to authenticated users
-- But we need an explicit deny for anon role to prevent any public access
CREATE POLICY "Block anonymous access to leads"
ON public.leads
FOR SELECT
TO anon
USING (false);