# Tattua Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

REST API for tattoo studio management and quote generation.

## About

Backend system that allows user/studio registration, address management, and quote creation for tattoo services.

## Technologies

- **Node.js** - JavaScript runtime
- **TypeScript** - Typed superset of JavaScript  
- **Fastify** - High performance web framework
- **Supabase** - Backend-as-a-Service for PostgreSQL
- **Zod** - TypeScript-first schema validation
- **JWT** - JSON Web Token authentication

## Project Structure

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

## Data Models

### User
- `name`: User name
- `email`: Email for authentication
- `password`: Encrypted password
- `tax_id`: CPF/CNPJ (Brazilian tax ID)
- `created_at`: Creation date

### Address  
- `street`: Street address
- `number`: Number
- `complement`: Complement
- `neighborhood`: Neighborhood
- `city`: City
- `state`: State
- `zip_code`: ZIP code
- `user_id`: User ID (FK)

## Installation

1. Clone the repository

```bash
git clone https://github.com/bezerraluiz/tattua-backend.git
cd tattua-backend
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

```env
JWT_SECRET=your_jwt_secret_here
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVIC_ROLE_KEY=your_supabase_key
```

4. Run the server

```bash
npm run dev
```

Server available at `http://localhost:3333`

## Scripts

- `npm run dev` - Runs the server in development mode
- `npm test` - Runs tests

## Security

- Passwords encrypted with bcrypt
- JWT authentication
- Data validation with Zod
- CORS configured

## Author

Luiz Bezerra  
GitHub: [@bezerraluiz](https://github.com/bezerraluiz)
