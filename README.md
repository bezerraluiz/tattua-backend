# Tattua 🎨

Sistema de gerenciamento e geração de orçamentos para estúdios de tatuagem.

## 📋 Sobre o Projeto

O Tattua é uma API REST desenvolvida para facilitar o gerenciamento de estúdios de tatuagem e a criação de orçamentos personalizados para clientes. O sistema permite o cadastro de estúdios, criação de orçamentos detalhados e gerenciamento de campos personalizados.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Fastify** - Framework web rápido e eficiente
- **Supabase** - Backend-as-a-Service (BaaS)
- **Zod** - Validação de esquemas TypeScript-first
- **bcrypt** - Hash de senhas
- **JWT** - Autenticação via JSON Web Tokens

## 📦 Dependências Principais

```json
{
  "@fastify/cookie": "^11.0.2",
  "@fastify/cors": "^11.1.0", 
  "@fastify/jwt": "^9.1.0",
  "@supabase/supabase-js": "^2.53.0",
  "bcrypt": "^6.0.0",
  "fastify": "^5.4.0",
  "zod": "^4.0.14"
}
```

## 🏗️ Estrutura do Projeto

```
src/
├── address/
│   └── address.model.ts
├── user/
│   ├── controllers.ts
│   ├── services.ts
│   ├── user.model.ts
│   ├── dtos/
│   └── schemas/
└── server.ts
```

## 🗄️ Estrutura de Dados

### Studio (Estúdio)
- `name`: Nome do estúdio
- `address`: Endereço do estúdio
- `tax_id`: CPF/CNPJ
- `password`: Senha de acesso
- `price_per_cm`: Preço por centímetro de tatuagem
- `price_per_needle`: Preço por agulha utilizada

### Quote (Orçamento)
- `studio_name`: Nome do estúdio (FK para Studio)
- `artist_name`: Nome do tatuador
- `studio_tax_id`: CPF/CNPJ do estúdio (FK para Studio)
- `client_name`: Nome do cliente
- `size_cm`: Tamanho da tatuagem em centímetros
- `needle_count`: Quantidade de agulhas utilizadas
- `custom_fields`: Campos personalizados (dicionário)
- `total_price`: Valor total do orçamento

### CustomField (Campo Personalizado)
- `name`: Nome do campo
- `value`: Valor do campo
- `type`: Tipo de dados ("Texto" ou "Seleção")

## 🔗 Relacionamentos

- **Quote** pertence a **Studio**
- **Quote** possui muitos **CustomFields**

## ⚙️ Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/bezerraluiz/tattua.git
cd tattua
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env`:
```env
BASE_URL=http://localhost:3333
JWT_SECRET=seu_jwt_secret_aqui
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
```

4. Execute o servidor em modo de desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333` 🚀

## 🛠️ Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo de desenvolvimento com hot reload
- `npm test` - Executa os testes (ainda não implementado)

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt
- Autenticação via JWT
- CORS habilitado somente ao nosso front
- Validação de dados com Zod

## 👨‍💻 Autor

**bezerraluiz**
- GitHub: [@bezerraluiz](https://github.com/bezerraluiz)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
