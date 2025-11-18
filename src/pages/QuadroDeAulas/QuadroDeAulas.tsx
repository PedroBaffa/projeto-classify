import React, { useState } from "react";
import styles from "./QuadroDeAulas.module.css";
import { weekData } from "../../data/mockData";
export function QuadroDeAulas() {
  const [selectedDay, setSelectedDay] = useState<string>("Segunda-feira");

  return (
    <>
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

      <div className={styles.weekGridWrapper}>
        <div className={styles.weekGrid}>
          {weekData.map((day) => (
            <div
              key={day.day}
              className={`${styles.dayColumn} ${
                day.day === selectedDay ? styles.dayColumnActive : ""
              }`}
              onClick={() => setSelectedDay(day.day)} 
            >
              <h3
                className={`${styles.dayHeader} ${
                  day.day === selectedDay ? styles.dayHeaderActive : ""
                }`}
              >
                {day.day}
              </h3>

              <div className={styles.dayContent}>
                {day.aulaBlock && (
                  <div className={styles.aulaBlock}>
                    {day.aulaBlock.split("\n").map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </div>
                )}

                {day.pills.map((pill) => (
                  <div
                    key={pill.id}
                    className={`${styles.pill} ${styles[pill.type]}`}
                  >
                    {pill.text}
                  </div>
                ))}

                {(day.status === "empty" || day.status === "holiday") && (
                  <span className={styles.semAula}>(Sem Aula)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}