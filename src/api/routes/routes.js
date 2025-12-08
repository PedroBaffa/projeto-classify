import express from 'express';
import { login, register } from './controllers/authController.js';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// rotas de Auth
router.post('/login', login);
router.post('/register', register);

router.get('/dashboard-data', async (req, res) => {
  try {
    const [ucs, salas, solicitacoes] = await Promise.all([
      prisma.uC.findMany({ include: { turmas: true, dias: true } }),
      prisma.sala.findMany(),
      prisma.solicitacao.findMany()
    ]);

    res.json({
      ucs,
      salas,
      solicitacoes
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

export default router;