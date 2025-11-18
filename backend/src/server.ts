import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // leitura de JSON

// rota de teste
app.get('/', (req, res) => {
  res.send('servidor ta rodando tmj.');
});

// porta do servidor
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});