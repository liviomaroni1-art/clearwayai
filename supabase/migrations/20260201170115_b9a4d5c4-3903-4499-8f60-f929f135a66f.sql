-- Add explicit INSERT DENY policy for user_roles table
-- This makes it crystal clear that no one can insert roles via RLS
-- Role assignments must be done via service role or direct SQL by admins
CREATE POLICY "No one can insert user_roles via RLS"
ON public.user_roles FOR INSERT
WITH CHECK (false);