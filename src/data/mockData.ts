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