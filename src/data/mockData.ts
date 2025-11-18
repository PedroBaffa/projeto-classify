export const mockUCs = [
  {
    id: 1,
    nome: "Cálculo 1",
    salas: ["Sala 301A", "Lab 1 (Bloco B)"],
    dias: ["Segunda-feira", "Quarta-feira"],
    cor: "laranja",
    turmas: ["ADS - 1º Sem (A)", "Eng. Civil - 1º Sem (B)"],
  },
  {
    id: 2,
    nome: "Programação Experimental",
    salas: ["Laboratório de Computação (Bloco A)"],
    dias: ["Terça-feira", "Quinta-feira"],
    cor: "azul",
    turmas: ["ADS - 1º Sem (A)", "Eng. Comp - 2º Sem (A)"],
  },
  {
    id: 3,
    nome: "Algoritmos e Estrutura de Dados",
    salas: ["Sala 205B"],
    dias: ["Segunda-feira", "Sexta-feira"],
    cor: "verde",
    turmas: ["Eng. Comp - 2º Sem (A)", "Ciência da Comp. - 3º Sem"],
  },
  {
    id: 4,
    nome: "Projeto Interdisciplinar",
    salas: ["Sala 101A", "Sala 101B"],
    dias: ["Quarta-feira"],
    cor: "roxo",
    turmas: ["ADS - 1º Sem (A)", "Eng. Comp - 2º Sem (A)"],
  },
];

export const mockSalas = [
  {
    id: 1,
    nome: "Sala 01",
    capacidade: 40,
    disponibilidade: [
      { dia: "Domingo", disponivel: false },
      { dia: "Segunda", disponivel: true },
      { dia: "Terça", disponivel: true },
      { dia: "Quarta", disponivel: false },
      { dia: "Quinta", disponivel: true },
      { dia: "Sexta", disponivel: true },
      { dia: "Sábado", disponivel: false },
    ],
  },
  {
    id: 2,
    nome: "Sala 02",
    capacidade: 35,
    disponibilidade: [
      { dia: "Domingo", disponivel: false },
      { dia: "Segunda", disponivel: true },
      { dia: "Terça", disponivel: false },
      { dia: "Quarta", disponivel: true },
      { dia: "Quinta", disponivel: true },
      { dia: "Sexta", disponivel: true },
      { dia: "Sábado", disponivel: false },
    ],
  },
  {
    id: 3,
    nome: "Lab Química",
    capacidade: 25,
    disponibilidade: [
      { dia: "Domingo", disponivel: false },
      { dia: "Segunda", disponivel: true },
      { dia: "Terça", disponivel: true },
      { dia: "Quarta", disponivel: true },
      { dia: "Quinta", disponivel: false },
      { dia: "Sexta", disponivel: false },
      { dia: "Sábado", disponivel: false },
    ],
  },
];


export const weekData = [
  {
    day: "Domingo",
    status: "empty", 
    aulaBlock: null,
    pills: [],
  },
  {
    day: "Segunda-feira",
    status: "normal",
    aulaBlock: "Aulas - Manhã\n8:00 às 12:00",
    pills: [
      { id: 1, text: "ADS - 1º Sem (A)", type: "normal" },
      { id: 2, text: "Eng. Comp - 2º Sem (A)", type: "normal" },
      { id: 3, text: "Eng. Civil - 1º Sem (B)", type: "normal" },
      { id: 4, text: "ADS - 1º Sem (A)", type: "normal" },
      { id: 5, text: "Vaga", type: "vaga" },
      { id: 6, text: "ATPC", type: "atpc" },
    ],
  },
  {
    day: "Terça-feira",
    status: "normal",
    aulaBlock: "Aulas - Tarde\n13:00 às 17:00",
    pills: [
      { id: 7, text: "Eng. Comp - 2º Sem (A)", type: "normal" },
      { id: 8, text: "Vaga", type: "vaga" },
      { id: 9, text: "Ciência da Comp. - 3º Sem", type: "normal" },
      { id: 10, text: "Vaga", type: "vaga" },
      { id: 11, text: "ADS - 1º Sem (A)", type: "normal" },
      { id: 12, text: "Vaga", type: "vaga" },
    ],
  },
  {
    day: "Quarta-feira",
    status: "normal",
    aulaBlock: "Aulas - Manhã\n8:00 às 12:00",
    pills: [
      { id: 13, text: "Vaga", type: "vaga" },
      { id: 14, text: "ADS - 1º Sem (A)", type: "normal" },
      { id: 15, text: "Eng. Civil - 1º Sem (B)", type: "normal" },
      { id: 16, text: "Vaga", type: "vaga" },
      { id: 17, text: "Eng. Comp - 2º Sem (A)", type: "normal" },
      { id: 18, text: "Vaga", type: "vaga" },
    ],
  },
  {
    day: "Quinta-feira",
    status: "holiday",
    aulaBlock: null,
    pills: [{ id: 19, text: "Feriado", type: "holiday" }],
  },
  {
    day: "Sexta-feira",
    status: "normal",
    aulaBlock: "Aulas - Noite\n19:00 às 22:30",
    pills: [
      { id: 20, text: "Ciência da Comp. - 3º Sem", type: "normal" },
      { id: 21, text: "ADS - 1º Sem (A)", type: "normal" }
    ],
  },
  {
    day: "Sábado",
    status: "empty",
    aulaBlock: null,
    pills: [],
  },
];

export const mockSolicitacoes = [
  {
    id: 1,
    tipo: "escala",
    titulo: "Alteração de escala (Manhã)",
    status: "pendente",
    descricao: "Gostaria de solicitar a troca da minha aula de 'Cálculo 1' (ADS - 1º Sem (A)) da Segunda-feira (8:00) para a Quarta-feira (10:00), pois tenho uma consulta médica recorrente.",
  },
  {
    id: 2,
    tipo: "escala",
    titulo: "Alteração de escala (Noite)",
    status: "resolvido",
    descricao: "Solicitei a remoção da aula de Sexta-feira à noite, e já foi aprovada pela coordenação. Esta solicitação pode ser arquivada.",
  },
  {
    id: 3,
    tipo: "ucs",
    titulo: "Adicionar UC de 'IA'",
    status: "pendente",
    descricao: "Tenho especialização em Inteligência Artificial e gostaria de ser considerado para lecionar a nova UC 'IA Aplicada' no próximo semestre.",
  },
  {
    id: 4,
    tipo: "salas",
    titulo: "Problema na Sala 205B",
    status: "resolvido",
    descricao: "O projetor da sala 205B estava com problemas. A manutenção já foi efetuada e o problema foi resolvido.",
  },
];