# Database Automation - Functions & Triggers

Documentation of functions and triggers that automate database operations.

## Table of Contents

- [Functions](#functions)
- [Triggers](#triggers)
- [Table Structure](#table-structure)
- [Implementation](#implementation)
- [Troubleshooting](#troubleshooting)

## Functions

### 1. update_updated_at_column()

![Status](https://img.shields.io/badge/Status-Implemented-green)

Automatically updates the `updated_at` field in any table.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Used in**: `addresses`, `users`

### 2. handle_new_user()

![Status](https://img.shields.io/badge/Status-Implemented-green)

Syncs user creation from Supabase Auth to the `public.users` table.

```sql
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
```

### 3. handle_auth_user_update()

![Status](https://img.shields.io/badge/Status-Implemented-green)

Syncs user updates from Supabase Auth to the `public.users` table.

```sql
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
```

### 4. handle_auth_user_delete()

![Status](https://img.shields.io/badge/Status-Implemented-green)

Removes user from the `public.users` table when deleted from Auth. Also deletes associated addresses due to CASCADE constraint.

```sql
CREATE OR REPLACE FUNCTION public.handle_auth_user_delete()
RETURNS trigger AS $$
BEGIN
  DELETE FROM public.users WHERE uid = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Triggers

### updated_at Triggers

![Status](https://img.shields.io/badge/Status-Implemented-green)

```sql
-- Addresses
CREATE TRIGGER update_addresses_updated_at
    BEFORE UPDATE ON public.addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Users
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### User Creation Trigger

![Status](https://img.shields.io/badge/Status-Implemented-green)

```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### User Update Trigger

![Status](https://img.shields.io/badge/Status-Implemented-green)

```sql
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_auth_user_update();
```

### User Deletion Trigger

![Status](https://img.shields.io/badge/Status-Implemented-green)

```sql
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_auth_user_delete();
```

## Table Structure

### addresses

```sql
id                SERIAL PRIMARY KEY
uid               UUID UNIQUE NOT NULL DEFAULT gen_random_uuid()
user_id           INTEGER REFERENCES users(id) ON DELETE CASCADE
country           VARCHAR(100) NOT NULL
street            VARCHAR(255) NOT NULL
number            VARCHAR(20) NOT NULL
complement        VARCHAR(255)
city              VARCHAR(100) NOT NULL
state             VARCHAR(100) NOT NULL
zip_code          VARCHAR(20) NOT NULL
created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

### users

```sql
id                SERIAL PRIMARY KEY
uid               UUID UNIQUE NOT NULL DEFAULT gen_random_uuid()
studio_name       VARCHAR(255) NOT NULL
email             VARCHAR(255) UNIQUE NOT NULL
tax_id            VARCHAR(20) UNIQUE NOT NULL
created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

## Implementation

To implement pending functions:

### 1. Create migration

```bash
supabase migration new sync_auth_updates
```

### 2. Add SQL

```sql
-- Function for updates
CREATE OR REPLACE FUNCTION public.handle_auth_user_update()
RETURNS trigger AS $$
BEGIN
  UPDATE public.users 
  SET 
    email = NEW.email,
    studio_name = COALESCE(NEW.raw_user_meta_data->>'studio_name', studio_name),
    tax_id = COALESCE(NEW.raw_user_meta_data->>'tax_id', tax_id),
    address_id = CASE 
      WHEN NEW.raw_user_meta_data->>'address_id' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'address_id')::INTEGER 
      ELSE address_id 
    END,
    updated_at = NOW()
  WHERE uid = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function for deletes
CREATE OR REPLACE FUNCTION public.handle_auth_user_delete()
RETURNS trigger AS $$
BEGIN
  DELETE FROM public.users WHERE uid = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_auth_user_update();

CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_auth_user_delete();
```

### 3. Apply migration

```bash
supabase db push
```

## Troubleshooting

### Check active triggers

```sql
SELECT 
    trigger_name, 
    event_object_table, 
    action_timing, 
    event_manipulation
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
   OR event_object_table = 'users';
```

### Check functions

```sql
SELECT 
    routine_name,
    routine_type,
    security_type
FROM information_schema.routines 
WHERE routine_schema = 'public';
```

### Debug metadata

```sql
SELECT 
    id,
    email,
    raw_user_meta_data
FROM auth.users 
LIMIT 5;
```

---

**Last updated**: August 18, 2025