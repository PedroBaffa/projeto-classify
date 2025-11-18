// src/pages/QuadroDeAulas/QuadroDeAulas.tsx
import { useState } from "react";
import styles from "./QuadroDeAulas.module.css";

// --- DADOS FICTÍCIOS (MOCK) ---
// (Pronto para ser substituído por uma chamada de API)
const weekData = [
  {
    day: "Domingo",
    status: "empty", // 'empty', 'normal', 'holiday'
    aulaBlock: null,
    pills: [],
  },
  {
    day: "Segunda-feira",
    status: "normal",
    aulaBlock: "Aula Normal\n8:00 às 12:00",
    pills: [
      { id: 1, text: "2º Ano - B", type: "normal" },
      { id: 2, text: "2º Ano - A", type: "normal" },
      { id: 3, text: "7º Ano - C", type: "normal" },
      { id: 4, text: "7º Ano - C", type: "normal" },
      { id: 5, text: "2º Ano - A", type: "normal" },
      { id: 6, text: "ATPC", type: "atpc" },
    ],
  },
  {
    day: "Terça-feira",
    status: "normal",
    aulaBlock: "Aula Normal\n8:00 às 12:00",
    pills: [
      { id: 7, text: "1º Ano - A", type: "normal" },
      { id: 8, text: "1º Ano - A", type: "normal" },
      { id: 9, text: "8º Ano - B", type: "normal" },
      { id: 10, text: "Vaga", type: "vaga" },
      { id: 11, text: "Vaga", type: "vaga" },
      { id: 12, text: "9º Ano - B", type: "normal" },
    ],
  },
  {
    day: "Quarta-feira",
    status: "normal",
    aulaBlock: "Aula Normal\n8:00 às 12:00",
    pills: [
      { id: 13, text: "Vaga", type: "vaga" },
      { id: 14, text: "6º Ano - C", type: "normal" },
      { id: 15, text: "2º Ano - A", type: "normal" },
      { id: 16, text: "Vaga", type: "vaga" },
      { id: 17, text: "Vaga", type: "vaga" },
      { id: 18, text: "9º Ano - A", type: "normal" },
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
    status: "holiday",
    aulaBlock: null,
    pills: [{ id: 20, text: "Emenda", type: "holiday" }],
  },
  {
    day: "Sábado",
    status: "empty",
    aulaBlock: null,
    pills: [],
  },
];
// ------------------------------------

export function QuadroDeAulas() {
  // Estado para controlar o dia selecionado (clicável)
  const [selectedDay, setSelectedDay] = useState<string>("Segunda-feira");

  return (
    <>
      {/* --- 1. BARRA DE FILTROS --- */}
      <div className={styles.filterBar}>
        <select className={styles.dropdownMes}>
          <option>Mês</option>
        </select>

        <div className={styles.weekControl}>
          <button className={styles.weekArrow}>{"‹"}</button>
          <span className={styles.weekLabel}>Semana 01</span>
          <button className={styles.weekArrow}>{"›"}</button>
        </div>

        <button className={styles.todayButton}>Exibir hoje</button>
      </div>

      {/* --- 2. WRAPPER DO QUADRO --- */}
      {/* Este div serve para centralizar o .weekGrid e permitir scroll horizontal */}
      <div className={styles.weekGridWrapper}>
        {/* Este é o container do fundo branco */}
        <div className={styles.weekGrid}>
          {/* Mapeia os 7 dias da semana */}
          {weekData.map((day) => (
            <div
              key={day.day}
              className={`${styles.dayColumn} ${
                day.day === selectedDay ? styles.dayColumnActive : ""
              }`}
              onClick={() => setSelectedDay(day.day)} // <-- Torna o dia clicável
            >
              {/* Cabeçalho do Dia */}
              <h3
                className={`${styles.dayHeader} ${
                  day.day === selectedDay ? styles.dayHeaderActive : ""
                }`}
              >
                {day.day}
              </h3>

              {/* Conteúdo do Dia (Pílulas) */}
              <div className={styles.dayContent}>
                {/* Bloco de Aula (Ex: "Aula Normal...") */}
                {day.aulaBlock && (
                  <div className={styles.aulaBlock}>
                    {day.aulaBlock.split("\n").map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </div>
                )}

                {/* Pílulas de Aulas */}
                {day.pills.map((pill) => (
                  <div
                    key={pill.id}
                    className={`${styles.pill} ${styles[pill.type]}`}
                  >
                    {pill.text}
                  </div>
                ))}

                {/* Estado Vazio (Ex: "Sem Aula" ou Feriado) */}
                {(day.status === "empty" || day.status === "holiday") && (
                  <span className={styles.semAula}>(Sem Aula)</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Fim do .weekGrid */}
      </div>
      {/* Fim do .weekGridWrapper */}
    </>
  );
}
