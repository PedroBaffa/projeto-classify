import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout'; // O nosso "molde"

// --- NOSSAS PÁGINAS REAIS ---
import { TelaInicial } from './pages/TelaInicial/TelaInicial';
import { TelaAtuacao } from './pages/TelaAtuacao/TelaAtuacao'; 
import { TelaServicos } from './pages/TelaServicos/TelaServicos'; // 1. IMPORTE A NOVA PÁGINA

// --- Placeholders (Páginas em breve) ---
function PaginaSuporte() {
  return <main style={{ padding: '2rem 20px', zIndex: 1, maxWidth: '960px', margin: '0 auto' }}><h1>Suporte (Em Breve)</h1></main>;
}
function PaginaSobreNos() {
  return <main style={{ padding: '2rem 20px', zIndex: 1, maxWidth: '960px', margin: '0 auto' }}><h1>Sobre Nós (Em Breve)</h1></main>;
}
function PaginaEntrar() {
  return <main style={{ padding: '2rem 20px', zIndex: 1, maxWidth: '960px', margin: '0 auto' }}><h1>Página de Login (Em Breve)</h1></main>;
}


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        
        <Route path="/" element={<TelaInicial />} />
        <Route path="/atuacao" element={<TelaAtuacao />} />
        
        {/* 2. ADICIONE A NOVA ROTA AQUI */}
        <Route path="/servicos" element={<TelaServicos />} />
        
        {/* 3. ADICIONEI AS ROTAS RESTANTES */}
        <Route path="/suporte" element={<PaginaSuporte />} />
        <Route path="/sobre-nos" element={<PaginaSobreNos />} />
        <Route path="/entrar" element={<PaginaEntrar />} />
      
      </Route>
    </Routes>
  );
}

export default App;