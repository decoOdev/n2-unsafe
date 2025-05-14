import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.redirect('/register'));

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Vulnerável: dados injetados direto na query
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ('${username}', '${email}', '${password}')
  `;

  try {
    await pool.query(query);
    res.redirect('/login');
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).send('Erro ao registrar');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Consulta completamente vulnerável a SQL Injection
  const query = `
    SELECT * FROM users
    WHERE email = '${email}' AND password = '${password}'
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.redirect('/users');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).send('Erro interno');
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.render('users', { users: result.rows });
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send('Erro ao buscar usuários');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});