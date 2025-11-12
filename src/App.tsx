import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout"; // O nosso "molde"

// --- PÁGINAS DA LANDING PAGE ---
import { TelaInicial } from "./pages/TelaInicial/TelaInicial";
import { TelaAtuacao } from "./pages/TelaAtuacao/TelaAtuacao";
import { TelaServicos } from "./pages/TelaServicos/TelaServicos";
import { TelaSuporte } from "./pages/TelaSuporte/TelaSuporte";
import { TelaSobreNos } from "./pages/TelaSobreNos/TelaSobreNos";

// --- PÁGINAS DE AUTENTICAÇÃO ---
import { TelaLogin } from "./pages/TelaLogin/TelaLogin";
import { TelaCadastro } from "./pages/TelaCadastro/TelaCadastro";
import { TelaAlterarSenha } from "./pages/TelaAlterarSenha/TelaAlterarSenha"; // 1. IMPORTE

function App() {
  return (
    <Routes>
      {/* --- GRUPO 1: ROTAS DA LANDING PAGE (Com Header/Footer) --- */}
      <Route element={<Layout />}>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/atuacao" element={<TelaAtuacao />} />
        <Route path="/servicos" element={<TelaServicos />} />
        <Route path="/suporte" element={<TelaSuporte />} />
        <Route path="/sobre-nos" element={<TelaSobreNos />} />
      </Route>

      {/* --- GRUPO 2: ROTAS DE AUTENTICAÇÃO (Layout Limpo) --- */}
      <Route path="/entrar" element={<TelaLogin />} />
      <Route path="/cadastro" element={<TelaCadastro />} />

      {/* 2. ADICIONE A NOVA ROTA */}
      {/* Esta rota será acedida após o primeiro login bem-sucedido */}
      <Route path="/primeiro-login" element={<TelaAlterarSenha />} />
    </Routes>
  );
}

export default App;
