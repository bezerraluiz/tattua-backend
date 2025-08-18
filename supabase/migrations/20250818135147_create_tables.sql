-- Criar tabela de endereços primeiro (devido à referência de chave estrangeira)
CREATE TABLE IF NOT EXISTS public.addresses (
  id SERIAL PRIMARY KEY,
  uid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  country VARCHAR(100) NOT NULL,
  street VARCHAR(255) NOT NULL,
  number VARCHAR(20) NOT NULL,
  complement VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  uid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  studio_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  tax_id VARCHAR(20) UNIQUE NOT NULL,
  address_id INTEGER REFERENCES public.addresses(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_addresses_uid ON public.addresses(uid);
CREATE INDEX IF NOT EXISTS idx_users_uid ON public.users(uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_tax_id ON public.users(tax_id);
CREATE INDEX IF NOT EXISTS idx_users_address_id ON public.users(address_id);

-- Criar trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger nas tabelas
CREATE TRIGGER update_addresses_updated_at
    BEFORE UPDATE ON public.addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Função para sincronizar usuários do Supabase Auth (opcional)
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

-- Trigger para sincronização automática com auth (opcional)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();