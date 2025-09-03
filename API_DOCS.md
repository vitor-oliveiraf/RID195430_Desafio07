# 📚 Documentação da API de Usuários

## 🚀 Endpoints Disponíveis

### **POST /users** - Criar Usuário

**Código de Status**: 201 (Created)

**Body**:

```json
{
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta de Sucesso**:

```json
{
  "message": "✅ Usuário criado com sucesso!",
  "user": {
    "id": 1,
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@email.com",
    "createdAt": "2025-09-03T10:30:00.000Z",
    "updatedAt": "2025-09-03T10:30:00.000Z"
  }
}
```

---

### **GET /users** - Listar Todos os Usuários

**Código de Status**: 200 (OK)

**Resposta**:

```json
{
  "message": "📋 Usuários encontrados",
  "count": 2,
  "users": [
    {
      "id": 1,
      "name": "João Silva",
      "username": "joaosilva",
      "email": "joao@email.com",
      "createdAt": "2025-09-03T10:30:00.000Z",
      "updatedAt": "2025-09-03T10:30:00.000Z"
    }
  ]
}
```

---

### **GET /users/:id** - Buscar Usuário por ID

**Código de Status**: 200 (OK)

**Parâmetros**: `id` (número)

**Resposta**:

```json
{
  "message": "👤 Usuário encontrado",
  "user": {
    "id": 1,
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@email.com",
    "createdAt": "2025-09-03T10:30:00.000Z",
    "updatedAt": "2025-09-03T10:30:00.000Z"
  }
}
```

---

### **GET /users/username/:username** - Buscar Usuário por Username

**Código de Status**: 200 (OK)

**Parâmetros**: `username` (string)

---

### **GET /users/email/:email** - Buscar Usuário por Email

**Código de Status**: 200 (OK)

**Parâmetros**: `email` (string)

---

### **PUT /users/:id** - Atualizar Usuário

**Código de Status**: 200 (OK)

**Parâmetros**: `id` (número)

**Body** (campos opcionais):

```json
{
  "name": "João Silva Atualizado",
  "email": "joao.novo@email.com"
}
```

**Resposta**:

```json
{
  "message": "✅ Usuário atualizado com sucesso!",
  "user": {
    "id": 1,
    "name": "João Silva Atualizado",
    "username": "joaosilva",
    "email": "joao.novo@email.com",
    "createdAt": "2025-09-03T10:30:00.000Z",
    "updatedAt": "2025-09-03T10:35:00.000Z"
  }
}
```

---

### **DELETE /users/:id** - Deletar Usuário

**Código de Status**: 204 (No Content)

**Parâmetros**: `id` (número)

---

### **POST /users/validate** - Validar Credenciais

**Código de Status**: 200 (OK)

**Body**:

```json
{
  "username": "joaosilva",
  "password": "senha123"
}
```

**Resposta de Sucesso**:

```json
{
  "message": "✅ Credenciais válidas",
  "user": {
    "id": 1,
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@email.com",
    "createdAt": "2025-09-03T10:30:00.000Z",
    "updatedAt": "2025-09-03T10:30:00.000Z"
  }
}
```

**Resposta de Falha**:

```json
{
  "message": "❌ Credenciais inválidas",
  "user": null
}
```

---

## 🔒 **Segurança**

- ✅ **Senhas criptografadas** com bcrypt (salt rounds: 10)
- ✅ **Validação de unicidade** para username e email
- ✅ **Sanitização de dados** (senha nunca retornada)
- ✅ **Tratamento de erros** com códigos HTTP apropriados

## 🗄️ **Banco de Dados**

- **Tabela**: `users`
- **Campos únicos**: `username`, `email`
- **Timestamps**: `createdAt`, `updatedAt`
- **Criptografia**: Senha hash com bcrypt

## 🧪 **Para Testar**

1. **Execute**: `npm run start:dev`
2. **Base URL**: `http://localhost:3000`
3. **Use Postman/Insomnia** ou **curl** para testar os endpoints
