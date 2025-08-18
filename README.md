# Tattua Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

API REST para gerenciamento de estúdios de tatuagem e geração de orçamentos.

## Sobre

Sistema backend que permite o cadastro de usuários/estúdios, gerenciamento de endereços e criação de orçamentos para serviços de tatuagem.

## Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript  
- **Fastify** - Framework web de alta performance
- **Supabase** - Backend-as-a-Service para PostgreSQL
- **Zod** - Validação de esquemas TypeScript-first
- **JWT** - Autenticação via JSON Web Tokens

## Estrutura do Projeto

```
src/
├── address/
│   ├── address.model.ts
│   ├── services.ts
│   └── dtos/
├── errors/
├── routes/
├── user/
│   ├── controllers.ts
│   ├── services.ts
│   ├── user.model.ts
│   ├── dtos/
│   └── schemas/
├── utils/
└── server.ts
```

## Modelos de Dados

### User
- `name`: Nome do usuário
- `email`: Email para autenticação
- `password`: Senha criptografada
- `tax_id`: CPF/CNPJ
- `created_at`: Data de criação

### Address  
- `street`: Logradouro
- `number`: Número
- `complement`: Complemento
- `neighborhood`: Bairro
- `city`: Cidade
- `state`: Estado
- `zip_code`: CEP
- `user_id`: ID do usuário (FK)

## Instalação

1. Clone o repositório

```bash
git clone https://github.com/bezerraluiz/tattua-backend.git
cd tattua-backend
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```env
JWT_SECRET=seu_jwt_secret_aqui
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
```

4. Execute o servidor

```bash
npm run dev
```

Servidor disponível em `http://localhost:3333`

## Scripts

- `npm run dev` - Executa o servidor em modo de desenvolvimento
- `npm test` - Executa os testes

## Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Validação de dados com Zod
- CORS configurado

## Autor

Luiz Bezerra  
GitHub: [@bezerraluiz](https://github.com/bezerraluiz)
