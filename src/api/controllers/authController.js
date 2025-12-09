import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = "SEGREDO_SUPER_SECRETO"; // em produção

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Usuário não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res
        .status(401)
        .json({ success: false, message: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1d",
    });
    const { senha: _, ...userSemSenha } = user;

    res.json({ success: true, user: userSemSenha, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

export const register = async (req, res) => {
  res.json({ message: "Rota de registro a implementar" });
};
