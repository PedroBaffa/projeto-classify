// src/api/routes.js
import express from 'express';
import { login, register } from './controllers/authController.js';

// Importação compatível com o Prisma no Docker
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const router = express.Router();
const prisma = new PrismaClient();

// Rota de Login
router.post('/login', login);

// Exemplo de rota de dados
router.get('/mock-data', (req, res) => {
    res.json({ message: "Rota funcionando! Implementar lógica do banco aqui." });
});

export default router;