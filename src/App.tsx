import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { DashboardLayout } from './components/DashboardLayout/DashboardLayout';
import { TelaInicial } from './pages/TelaInicial/TelaInicial';
import { TelaServicos } from './pages/TelaServicos/TelaServicos';
import { TelaSuporte } from './pages/TelaSuporte/TelaSuporte';
import { TelaAtuacao } from './pages/TelaAtuacao/TelaAtuacao'; 
import { TelaSobreNos } from './pages/TelaSobreNos/TelaSobreNos';
import { TelaLogin } from './pages/TelaLogin/TelaLogin';
import { TelaCadastro } from './pages/TelaCadastro/TelaCadastro';
import { TelaAlterarSenha } from './pages/TelaAlterarSenha/TelaAlterarSenha';
import { QuadroDeAulas } from './pages/QuadroDeAulas/QuadroDeAulas';

function App() {
  return (
    <Routes>
      
      <Route element={<Layout />}>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/servicos" element={<TelaServicos />} />
        <Route path="/suporte" element= {<TelaSuporte />} />
        <Route path="/atuacao" element={<TelaAtuacao />} />
        <Route path="/sobre-nos" element={<TelaSobreNos />} />
      </Route>
      
      <Route path="/entrar" element={<TelaLogin />} />
      <Route path="/cadastro" element={<TelaCadastro />} /> 
      <Route path="/primeiro-login" element={<TelaAlterarSenha />} /> 

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<QuadroDeAulas />} />
      </Route>
      
    </Routes>
  );
}

export default App;