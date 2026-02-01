-- Fix RLS policies for leads table
-- The issue is that all policies are RESTRICTIVE, but PostgreSQL RLS requires 
-- at least one PERMISSIVE policy to grant access. RESTRICTIVE policies can only 
-- further restrict access that was already granted by PERMISSIVE policies.

-- Drop existing policies on leads table
DROP POLICY IF EXISTS "Admins can read leads" ON public.leads;
DROP POLICY IF EXISTS "Block anonymous access to leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Create proper PERMISSIVE policies for leads table
-- Only authenticated admins can read leads
CREATE POLICY "Admins can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow anonymous and authenticated users to insert leads (for exit-intent popup)
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Fix RLS policies for user_roles table
-- Drop existing policies
DROP POLICY IF EXISTS "Block anonymous access to user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Create proper PERMISSIVE policy for user_roles table
-- Users can only view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);