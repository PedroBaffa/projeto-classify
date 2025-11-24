import express, { json } from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 2985;

app.use(cors());
app.use(json());

app.disable('etag');
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.set('Pragma', 'no-cache');
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockDataPath = path.resolve(__dirname, '../data/mock-data.json');

function readMockData() {
  try {
    const raw = fs.readFileSync(mockDataPath, 'utf8');
    const cleaned = raw.replace(/^\uFEFF/, '');
    return JSON.parse(cleaned);
  } catch (err) {
    return { users: [] };
  }
}

function writeMockData(obj) {
  fs.writeFileSync(mockDataPath, JSON.stringify(obj, null, 2), 'utf8');
}

function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  const out = { ...(target || {}) };
  for (const key of Object.keys(source)) {
    const val = source[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      out[key] = deepMerge(out[key], val);
    } else {
      out[key] = val;
    }
  }
  return out;
}
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  const data = readMockData();
  const user = (data.users || []).find(u => u.email === email && u.senha === senha);
  if (user) {
    return res.json({ success: true, user: { nome: user.nome, email: user.email } });
  }
  return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
});

app.get('/api/mock-data', (req, res) => {
  const data = readMockData();
  res.json(data);
});

app.put('/api/mock-data', (req, res) => {
  const incoming = req.body;
  if (!incoming || typeof incoming !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid payload' });
  }
  try {
    writeMockData(incoming);
    return res.json({ success: true, data: incoming });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to write mock data' });
  }
});

app.get('/api/user', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ success: false, message: 'email query required' });
  const data = readMockData();
  const user = (data.users || []).find(u => u.email === String(email));
  if (!user) return res.status(404).json({ success: false, message: 'user not found' });
  return res.json({ success: true, user });
});

app.put('/api/user', (req, res) => {
  const incoming = req.body;
  const email = incoming?.email;
  if (!email) return res.status(400).json({ success: false, message: 'email required' });
  const data = readMockData();
  const users = data.users || [];
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) return res.status(404).json({ success: false, message: 'user not found' });
  const updated = deepMerge(users[idx], incoming);
  users[idx] = updated;
  data.users = users;
  try {
    writeMockData(data);
    return res.json({ success: true, user: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update user' });
  }
});

const clientBuildPath = path.resolve(__dirname, '../../dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.use((req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor monolito rodando em http://localhost:${PORT}`);
});
