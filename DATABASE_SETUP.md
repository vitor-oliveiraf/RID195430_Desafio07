# Configuração do Banco de Dados MySQL

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=nest_db

# Environment
NODE_ENV=development
```

## Configurações Padrão

- **Host**: localhost
- **Porta**: 3306
- **Usuário**: root
- **Senha**: (vazia por padrão)
- **Database**: nest_db

## Funcionalidades

- ✅ **Auto-sincronização**: Ativa em desenvolvimento, desativa em produção
- ✅ **Logging**: Ativo em desenvolvimento para debug
- ✅ **Auto-load de entidades**: Carrega automaticamente todas as entidades
- ✅ **Suporte a MySQL**: Configurado para MySQL com mysql2

## Estrutura de Arquivos

```
src/
├── config/
│   └── database.config.ts    # Configuração do banco
├── app.module.ts             # Módulo principal com TypeORM
└── main.ts                   # Carregamento de variáveis de ambiente
```

## Próximos Passos

1. Criar o arquivo `.env` com suas credenciais
2. Criar o banco de dados `nest_db` no MySQL
3. Criar suas entidades (models) na pasta `src/entities/`
4. Executar `npm run start:dev` para testar a conexão
