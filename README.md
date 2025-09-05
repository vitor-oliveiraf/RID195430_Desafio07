# 🚀 API de Usuários - NestJS

API REST completa para gerenciamento de usuários com autenticação JWT, desenvolvida em NestJS e TypeScript.

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** - Login seguro com tokens
- 👤 **CRUD de Usuários** - Criar, listar, buscar, atualizar e deletar
- 🛡️ **Rotas Protegidas** - Acesso controlado por autenticação
- 🔒 **Criptografia de Senhas** - Senhas protegidas com bcrypt
- 📊 **Validação de Dados** - DTOs para validação de entrada
- 🗄️ **Banco MySQL** - Persistência de dados com TypeORM

## 🛠️ Tecnologias Utilizadas

### **Backend:**

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **Passport** - Estratégias de autenticação

### **Ferramentas:**

- **ESLint** - Linter
- **Prettier** - Formatação de código
- **Jest** - Testes
- **Docker** - Containerização do MySQL

## 📋 Pré-requisitos

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **Docker** (para MySQL)
- **Git**

## 🚀 Como Executar

### 1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd rid195430_desafio07
```

### 2. **Instale as dependências**

```bash
npm install
```

### 3. **Configure o banco de dados**

```bash
# Inicie o MySQL no Docker
docker run --name mysql-server -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=desafio7 -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin -p 3306:3306 -d mysql:latest
```

### 4. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=admin
DB_PASSWORD=admin
DB_DATABASE=desafio7

# JWT
JWT_SECRET=sua_chave_secreta_aqui

# Environment
NODE_ENV=development
```

### 5. **Execute a aplicação**

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📚 Endpoints da API

### **🔐 Autenticação**

- `POST /auth/login` - Login e geração de token JWT

### **👤 Usuários (Rotas Públicas)**

- `POST /users` - Criar usuário
- `POST /users/validate` - Validar credenciais

### **👤 Usuários (Rotas Protegidas)**

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `GET /users/username/:username` - Buscar por username
- `GET /users/email/:email` - Buscar por email
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## 🧪 Testando a API

### **1. Importe a Collection do Postman**

- Abra o Postman
- Importe o arquivo `postman_collection.json`
- Configure a variável `base_url` para `http://localhost:3000`

### **2. Fluxo de Teste**

```bash
# 1. Criar usuário
POST /users
{
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@email.com",
  "password": "senha123"
}

# 2. Fazer login
POST /auth/login
{
  "username": "joaosilva",
  "password": "senha123"
}

# 3. Usar token nas rotas protegidas
GET /users
Authorization: Bearer <seu_token_aqui>
```

## 📁 Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
│   ├── dto/             # DTOs de autenticação
│   ├── guards/          # Guards JWT
│   ├── strategies/      # Estratégias Passport
│   └── auth.service.ts  # Serviço de autenticação
├── modules/
│   └── users/           # Módulo de usuários
│       ├── dto/         # DTOs de usuário
│       ├── users.controller.ts
│       └── users.service.ts
├── entities/            # Entidades TypeORM
├── repositories/        # Repositórios
├── config/             # Configurações
└── main.ts             # Arquivo principal
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Testes
npm run test
npm run test:e2e

# Linting
npm run lint
npm run format
```

## 📖 Documentação

- **API Docs**: `API_DOCS.md`
- **Database Setup**: `DATABASE_SETUP.md`
- **Postman Collection**: `postman_collection.json`

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
