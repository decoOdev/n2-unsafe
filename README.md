# ⚠️ Versão Insegura – Projeto N2 (Segurança da Informação)

Este repositório contém a **versão insegura** da aplicação web desenvolvida para a disciplina de Segurança da Informação. Esta versão foi construída **propositalmente vulnerável** com o objetivo de permitir testes de pentesting, como **SQL Injection** e **XSS (Cross-Site Scripting)**.

---

## 🚫 Características da Versão Insegura

- Sem autenticação
- Sem criptografia de senha
- Sem validação de entrada
- Consultas SQL construídas manualmente (vulneráveis)
- Renderização sem escape (XSS armazenado)

---

## 📦 Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- EJS (interface HTML)
- pg (driver SQL direto)
- dotenv

---

## 🧪 Vulnerabilidades Simuladas

### 1. SQL Injection (Login)

- Rota: `POST /login`
- Payload: `' OR '1'='1`
- Resultado: acesso sem credenciais válidas

### 2. XSS Armazenado

- Rota: `POST /register` (campo username)
- Payload: `<script>alert('XSS')</script>`
- Resultado: ao acessar `/users`, o script é executado

---

## 🛠️ Como rodar o projeto

1. Clone o repositório
2. Configure o `.env` com os dados do seu PostgreSQL:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=sua_senha
   DB_NAME=n2unsafe
   ```
3. Crie o banco e a tabela:

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username TEXT,
     email TEXT,
     password TEXT
   );
   ```

4. Instale as dependências:

   ```bash
   npm install
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

## ⚠️ Atenção

Esta aplicação é **insegura de propósito** e foi feita exclusivamente para fins educacionais.
