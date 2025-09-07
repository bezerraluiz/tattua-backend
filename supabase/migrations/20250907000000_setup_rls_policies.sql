-- Ativar RLS nas tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Política para tabela users: usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own data" ON public.users
    FOR SELECT USING (auth.uid() = uid);

-- Política para tabela users: usuários podem atualizar apenas seus próprios dados
CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE USING (auth.uid() = uid);

-- Política para tabela users: permitir inserção de novos usuários
CREATE POLICY "Enable insert for users" ON public.users
    FOR INSERT WITH CHECK (true);

-- Política para tabela addresses: usuários podem ver endereços relacionados a eles
CREATE POLICY "Users can view own addresses" ON public.addresses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = addresses.user_id 
            AND users.uid = auth.uid()
        )
    );

-- Política para tabela addresses: usuários podem atualizar endereços relacionados a eles
CREATE POLICY "Users can update own addresses" ON public.addresses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = addresses.user_id 
            AND users.uid = auth.uid()
        )
    );

-- Política para tabela addresses: permitir inserção de novos endereços
CREATE POLICY "Enable insert for addresses" ON public.addresses
    FOR INSERT WITH CHECK (true);

-- Política para admins: service role pode fazer tudo (bypass RLS)
-- Nota: O service role key já bypassa RLS automaticamente no Supabase
