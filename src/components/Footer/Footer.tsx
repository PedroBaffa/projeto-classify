// src/components/Footer/Footer.tsx

import React from "react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* Nome do Grupo */}
        <p className={styles.groupName}>by - Dev Daily ©</p>

        {/* Nomes dos Participantes */}
        <div className={styles.participants}>
          <span>Pedro Baffa Carvalho</span>
          <span>Iann Nogueira Schmith</span>
          <span>Mateus Simões Marques</span>
          <span>Leonardo Albuquerque Avigro</span>
        </div>

        {/* Afiliação */}
        <p className={styles.affiliation}>
          Estudantes de Análise e Desenvolvimento de Sistemas (ADS)
          <br />
          Universidade São Judas Tadeu (USJT) - Campus Santana
        </p>
      </div>
    </footer>
  );
}
