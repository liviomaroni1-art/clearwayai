-- Fix: Explicitly deny UPDATE and DELETE on leads table
-- This makes it crystal clear that only INSERT is allowed (for lead capture) 
-- and only admins can SELECT (already in place)
CREATE POLICY "No one can update leads"
ON public.leads FOR UPDATE
USING (false);

CREATE POLICY "No one can delete leads"
ON public.leads FOR DELETE
USING (false);

-- Fix: Explicitly deny UPDATE and DELETE on user_roles table
-- Only database admins (via service role) should modify roles
CREATE POLICY "No one can update user_roles"
ON public.user_roles FOR UPDATE
USING (false);

CREATE POLICY "No one can delete user_roles"
ON public.user_roles FOR DELETE
USING (false);