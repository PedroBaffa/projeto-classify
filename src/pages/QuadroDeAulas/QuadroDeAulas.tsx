// src/pages/QuadroDeAulas/QuadroDeAulas.tsx
import React from 'react';
import styles from './QuadroDeAulas.module.css';

export function QuadroDeAulas() {
  return (
    <>
      <div className={styles.filterBar}>
        
        <select className={styles.dropdownMes}>
          <option>Mês</option>
        </select>

        <div className={styles.weekControl}>
          {/* --- MUDANÇA AQUI --- */}
          <button className={styles.weekArrow}>{"‹"}</button> 
          <span className={styles.weekLabel}>Semana 01</span>
          <button className={styles.weekArrow}>{"›"}</button>
          {/* --- FIM DA MUDANÇA --- */}
        </div>

        <button className={styles.todayButton}>
          Exibir hoje
        </button>
      </div>

      <div className={styles.weekGrid}>
        <p>(arrumando grid de quadro de aulas)</p>
      </div>
    </>
  );
}