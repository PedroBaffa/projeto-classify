import React, { useState } from "react";
import styles from "./TelaRelatorios.module.css";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";

const mockSalas = [
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

const mockUCs = [
  {
    id: 1,
    nome: "Física",
    turmas: ["2º Ano - A", "1º Ano - A", "2º Ano - B", "3º Ano - A"],
  },
  {
    id: 2,
    nome: "Matemática",
    turmas: ["6º Ano - C", "9º Ano - A", "9º Ano - B", "8º Ano - B", "7º Ano - C"],
  },
  {
    id: 3,
    nome: "Química",
    turmas: ["3º Ano - A", "2º Ano - B"],
  },
];

type ActiveTab = "salas" | "ucs" | null;

export function TelaRelatorios() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  
  const [salaSelecionada, setSalaSelecionada] = useState(mockSalas[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "salas":
        return (
          <div className={styles.scrollWrapper}>
            {mockSalas.map((sala) => (
              <div key={sala.id} className={styles.contentCard}>
                <h3 className={styles.cardTitle}>{sala.nome}</h3>
                <div className={styles.divider}></div>
                <div className={styles.availabilityList}>
                  <p>Disponibilidade</p>
                  {sala.disponibilidade.map((dia) => (
                    <div
                      key={dia.dia}
                      className={`${styles.diaPill} ${
                        dia.disponivel ? styles.diaDisponivel : styles.diaIndisponivel
                      }`}
                    >
                      {dia.dia}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "ucs":
        return (
          <div className={styles.scrollWrapper}>
            {mockUCs.map((uc) => (
              <div key={uc.id} className={styles.contentCard}>
                <h3 className={styles.cardTitle}>{uc.nome}</h3>
                <div className={styles.divider}></div>
                <div className={styles.turmaList}>
                  {uc.turmas.map((turma, index) => (
                    <div key={index} className={styles.turmaPill}>
                      {turma}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className={styles.placeholder}>
            <HeroLogo />
          </div>
        );
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sidebar}>
        <h1 className={styles.titulo}>Relatórios</h1>
        
        <button
          className={activeTab === "salas" ? styles.navButtonActive : styles.navButton}
          onClick={() => setActiveTab("salas")}
        >
          Salas
        </button>

        <button
          className={activeTab === "ucs" ? styles.navButtonActive : styles.navButton}
          onClick={() => setActiveTab("ucs")}
        >
          UCs
        </button>

        {activeTab === "salas" && (
          <div className={styles.infoBox}>
            <div className={styles.infoNav}>
              <span>{'<'}</span>
              <span>{salaSelecionada.nome}</span>
              <span>{'>'}</span>
            </div>
            <p>
              Capacidade: <strong>{salaSelecionada.capacidade}</strong>
            </p>
          </div>
        )}
      </div>

      <div className={styles.contentArea}>
        {renderContent()}
      </div>
    </div>
  );
}