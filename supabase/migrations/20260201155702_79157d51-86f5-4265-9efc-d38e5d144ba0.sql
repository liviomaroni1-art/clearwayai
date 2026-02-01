-- Add unique constraint on email to prevent duplicate lead entries
-- This helps mitigate database flooding with duplicate entries
ALTER TABLE public.leads ADD CONSTRAINT leads_email_unique UNIQUE (email);

-- Add email format and length constraint for database-level validation
-- This ensures data integrity even if someone bypasses edge function validation
ALTER TABLE public.leads 
ADD CONSTRAINT leads_email_format 
CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' AND length(email) <= 255);