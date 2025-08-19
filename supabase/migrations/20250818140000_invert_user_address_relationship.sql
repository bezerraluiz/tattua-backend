-- Drop the existing triggers and functions that reference address_id
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
DROP FUNCTION IF EXISTS public.handle_auth_user_update();
DROP FUNCTION IF EXISTS public.handle_auth_user_delete();

-- Remove address_id column from users table
ALTER TABLE public.users DROP COLUMN IF EXISTS address_id;

-- Add user_id column to addresses table
ALTER TABLE public.addresses ADD COLUMN user_id INTEGER;

-- Add foreign key constraint
ALTER TABLE public.addresses 
ADD CONSTRAINT fk_addresses_user_id 
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update the handle_new_user function to not include address_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (uid, email, studio_name, tax_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'studio_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'tax_id', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create updated function for user updates (without address_id)
CREATE OR REPLACE FUNCTION public.handle_auth_user_update()
RETURNS trigger AS $$
BEGIN
  UPDATE public.users 
  SET 
    email = NEW.email,
    studio_name = COALESCE(NEW.raw_user_meta_data->>'studio_name', studio_name),
    tax_id = COALESCE(NEW.raw_user_meta_data->>'tax_id', tax_id),
    updated_at = NOW()
  WHERE uid = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create updated function for user deletion (will cascade delete addresses)
CREATE OR REPLACE FUNCTION public.handle_auth_user_delete()
RETURNS trigger AS $$
BEGIN
  -- Delete user (addresses will be deleted automatically due to CASCADE)
  DELETE FROM public.users WHERE uid = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the triggers
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_auth_user_update();

CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_auth_user_delete();
