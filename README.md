# 🍔 Xis da Hora — API de Gerenciamento de Lanchonete

API completa para gerenciamento de uma lanchonete fictícia.  
Serve como backend para um sistema de pedidos e painel administrativo.

## 🚀 Sobre o Projeto
O **Xis da Hora** é um projeto fictício com finalidades estudantis.  
Ele simula um sistema real de **gerenciamento de produtos, categorias, pedidos e usuários**, incluindo envio de imagens para nuvem e autenticação JWT.

---

# 📑 Sumário
- [Tecnologias](#-tecnologias)
- [Arquitetura e Organização do Projeto](#-arquitetura-e-organização-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Instalação](#-instalação)
- [Rodando o Projeto](#-rodando-o-projeto)
- [Documentação das Rotas](#-documentação-das-rotas)
- [Funcionalidades](#-funcionalidades)
- [Licença](#-licença)

---

## 🧪 Tecnologias
- **Node.js**
- **TypeScript**
- **Express 5**
- **PostgreSQL**
- **Prisma ORM**
- **Cloudinary (upload de imagens)**
- **JWT (autenticação)**
- **Multer (upload local/temp)**
- **Swagger (documentação das rotas)**

### Dependências Principais
- bcrypt  
- dotenv  
- jsonwebtoken  
- multer / multer-storage-cloudinary  
- sharp  
- pg  
- prisma / @prisma/client  
- cloudinary  

---

## 🏗 Arquitetura e Organização do Projeto

src/
├─ controllers/
├─ services/
├─ repositories/
├─ middlewares/
├─ prisma/
├─ utils/
├─ types/
├─ config/
swagger/

Padrão baseado em **Controller → Service → Repository**, garantindo organização e regras de negócio desacopladas.

---

## 📌 Pré-requisitos
Você precisa ter instalado:

- **Node.js 18+**
- **PostgreSQL**
- **NPM** ou **Yarn**

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com:
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET_KEY="sua_chave_aqui"
CLOUDINARY_API_KEY="sua_key"
CLOUDINARY_SECRET="sua_secret"
CLOUD_NAME="seu_cloud_name"


---

## 📥 Instalação

### 🔧 Instalar dependências
```bash
npm install

🧱 Gerar o Prisma Client
npx prisma generate

🗂 Rodar migrações
npx prisma migrate dev

▶ Rodando o Projeto
Ambiente de desenvolvimento
npm run dev

Ambiente de produção
npm run build
npm start


📚 Documentação das Rotas

A API possui documentação via Swagger.

Após iniciar o servidor, acesse:
http://localhost:3000/api-docs

✨ Funcionalidades
👤 Usuários
Cadastro
Login com JWT
Validação de token
🍔 Produtos
CRUD completo
Associação de categorias
Upload de imagem para o Cloudinary
🏷 Categorias
CRUD completo
🛒 Pedidos
Criar pedidos
Listar pedidos
Atualizar status (fluxo completo)
Relatórios simples
☁ Upload de Imagens
Upload local (temporário)
Envio otimizado para Cloudinary usando Multer + Sharp




