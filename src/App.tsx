import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { TelaInicial } from "./pages/TelaInicial/TelaInicial";
import { TelaAtuacao } from "./pages/TelaAtuacao/TelaAtuacao";
import { TelaServicos } from "./pages/TelaServicos/TelaServicos";
import { TelaSuporte } from "./pages/TelaSuporte/TelaSuporte";
import { TelaSobreNos } from "./pages/TelaSobreNos/TelaSobreNos";
import { TelaLogin } from "./pages/TelaLogin/TelaLogin";
import { TelaCadastro } from "./pages/TelaCadastro/TelaCadastro";
import { TelaAlterarSenha } from "./pages/TelaAlterarSenha/TelaAlterarSenha";

function PaginaDashboard() { // apagar após implementar a dashboard
  return (
    <main
      style={{
        padding: "2rem 20px",
        zIndex: 1,
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <h1>Dashboard (Em Breve)</h1>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/atuacao" element={<TelaAtuacao />} />
        <Route path="/servicos" element={<TelaServicos />} />
        <Route path="/suporte" element={<TelaSuporte />} />
        <Route path="/sobre-nos" element={<TelaSobreNos />} />
      </Route>

      <Route path="/entrar" element={<TelaLogin />} />
      <Route path="/cadastro" element={<TelaCadastro />} />
      <Route path="/primeiro-login" element={<TelaAlterarSenha />} />

      <Route path="/dashboard" element={<PaginaDashboard />} />
    </Routes>
  );
}

export default App;
