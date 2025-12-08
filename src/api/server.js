import express, { json } from 'express';
import cors from 'cors';
import routes from './routes.js'; // importação das novas rotas

const app = express();
const PORT = process.env.PORT || 2985;

app.use(cors());
app.use(json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando (com Prisma) em http://localhost:${PORT}`);
});