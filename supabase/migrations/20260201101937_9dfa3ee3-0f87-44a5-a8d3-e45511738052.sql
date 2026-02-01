-- Fix 1: Leads table RLS conflict - Drop the conflicting "No direct read access" policy
-- The "Admins can read leads" policy already restricts SELECT to admin role only
DROP POLICY IF EXISTS "No direct read access" ON public.leads;

-- Fix 2: user_roles table - Add explicit policy to block anonymous/unauthenticated access
-- The current "Users can view own roles" policy uses auth.uid() = user_id, which returns NULL for anon users
-- but for extra security, add explicit denial for unauthenticated users
CREATE POLICY "Block anonymous access to user roles"
ON public.user_roles
FOR SELECT
TO anon
USING (false);