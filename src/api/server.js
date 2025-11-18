import express, { json } from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 2985;

app.use(cors());
app.use(json());

// Usuário mock para autenticação
const MOCK_USER = {
  email: 'prof@teste.com',
  senha: '123456',
  nome: 'Professor Teste'
};

app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  if (email === MOCK_USER.email && senha === MOCK_USER.senha) {
    return res.json({
      success: true,
      user: { nome: MOCK_USER.nome, email: MOCK_USER.email }
    });
  }
  return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
});

// Serve arquivos estáticos do front-end (após build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.resolve(__dirname, '../../dist');
app.use(express.static(clientBuildPath));

// SPA fallback (Express 5: use app.use como middleware)
app.use((req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor monolito rodando em http://localhost:${PORT}`);
});
