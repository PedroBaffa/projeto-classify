📄 Documentação: Projeto Classify (Front-end)

Este documento descreve a arquitetura, as decisões técnicas e a estrutura do front-end do projeto Classify, incluindo a landing page pública e o fluxo de autenticação/onboarding de usuários.

1. Visão Geral do Projeto

O objetivo é construir o front-end de um sistema web completo, baseado num design do Figma. A aplicação está a ser desenvolvida com uma abordagem moderna, focada em componentes reutilizáveis, performance e responsividade.

Stack Tecnológica

    Framework: React 18+

    Linguagem: TypeScript

    Build Tool: Vite

    Estilização: CSS Modules (para estilos por componente) e CSS Global

    Navegação: React Router DOM v6

2. Como Executar o Projeto

Para executar o ambiente de desenvolvimento local:
Bash

# 1. Instalar as dependências (apenas na primeira vez)

npm install

# 2. Iniciar o servidor de desenvolvimento

npm run dev

O projeto estará disponível em http://localhost:5173/.

3. Arquitetura de Layout

O projeto utiliza dois padrões de layout distintos, controlados pelo App.tsx (React Router) para separar as páginas públicas das páginas do sistema.

Padrão 1: O "Layout Universal" (Landing Page)

    Componente: src/components/Layout/Layout.tsx

    Utilização: Usado para todas as páginas públicas (Home, Atuação, Serviços, etc.).

    Função: Este componente "envolve" as páginas e fornece elementos consistentes:

        Header (Cabeçalho): Fixo (sticky), com efeito "glassmorphism" e navegação.

        Animação de Fundo: Os ícones caindo (fallingItemsContainer) vivem aqui.

        Footer (Rodapé): Fixo na parte inferior da janela em páginas curtas (usando flex-grow).

        <Outlet />: O "buraco" onde o React Router insere o conteúdo da página atual (ex: TelaInicial).

Padrão 2: Layout Limpo (Autenticação/Onboarding)

    Componentes: src/pages/TelaLogin, src/pages/TelaCadastro, etc.

    Utilização: Usado para páginas focadas que não devem ter a navegação principal (Login, Cadastro, Alterar Senha).

    Função: Estas páginas renderizam o seu próprio layout "do zero" (ex: o layout de 2 colunas do Login) e não são "envolvidas" pelo Layout.tsx.

Estrutura de Pastas (Visão Geral)

/src
|
|-- /assets # Imagens, SVGs e ícones
| |-- /icons # (Ícones da animação)
|
|-- /components # Componentes reutilizáveis (Átomos/Organismos)
| |-- /Button # (Botão "inteligente" com NavLink)
| |-- /Footer # (Rodapé universal)
| |-- /Header # (Cabeçalho universal - sticky e responsivo)
| |-- /HeroLogo # (O logo central da home)
| |-- /Layout # (O "molde" universal da landing page)
|
|-- /pages # Telas da aplicação
| |-- /TelaInicial # (Página "filha" do Layout)
| |-- /TelaAtuacao # (Página "filha" do Layout)
| |-- /TelaServicos # (Página "filha" do Layout)
| |-- /TelaSuporte # (Página "filha" do Layout)
| |-- /TelaSobreNos # (Página "filha" do Layout)
| |
| |-- /TelaLogin # (Página com layout limpo - 2 colunas)
| |-- /TelaCadastro # (Página com layout limpo - 2 colunas)
| |
| |-- /TelaAlterarSenha # (Página com layout limpo - Wizard)
| | |-- /components # (Etapas do Wizard)
| | | |-- Step1_Senha.tsx
| | | |-- Step2_Preferencias.tsx
| | |-- TelaAlterarSenha.tsx
| | |-- TelaAlterarSenha.module.css
|
|-- /styles # Estilos globais
| |-- global.css # (Fundo branco, texto escuro, fonte Poppins)
|
|-- App.tsx # Onde as rotas (URLs) são definidas
|-- main.tsx # Ponto de entrada (renderiza o App)

4. Navegação (Routing)

O App.tsx define os dois grupos de rotas:
TypeScript

function App() {
return (
<Routes>

      {/* --- GRUPO 1: ROTAS DA LANDING PAGE (Com Layout) --- */}
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
      <Route path="/primeiro-login" element={<TelaAlterarSenha />} />

    </Routes>

);
}

5. Fluxos de Autenticação / Onboarding

TelaLogin e TelaCadastro

    Layout: Usam um layout de 2 colunas (Painel Esquerdo com Logo/Animação, Painel Direito com Formulário/Texto).

    Reutilização de CSS: Para manter a consistência e evitar código duplicado, a TelaCadastro importa e reutiliza o CSS da TelaLogin (TelaLogin.module.css).

    Animação: A animação de partículas foi copiada para o TelaLogin.tsx e TelaCadastro.tsx para ser executada apenas no painel esquerdo.

TelaAlterarSenha (Padrão "Wizard" de Etapas)

Esta é a página mais complexa do fluxo, pois gere múltiplas etapas dentro de um único componente.

    Função: É uma página "Mãe" que controla um fluxo de onboarding.

    useState: Usa o useState do React para controlar em qual etapa (step) o usuário está.

    Componentes "Filho":

        Step1_Senha.tsx: Contém o formulário para alterar a senha.

        Step2_Preferencias.tsx: Contém o formulário para selecionar horários.

    Renderização Condicional: O TelaAlterarSenha.tsx renderiza <Step1_Senha /> OU <Step2_Preferencias /> com base no valor do estado step.

    Fluxo:

        O botão "Continuar" do Step1 chama a função onContinue (passada por props).

        Esta função atualiza o estado step na página "Mãe".

        O React re-renderiza a página, mostrando o Step2.