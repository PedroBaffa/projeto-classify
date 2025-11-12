
import React from "react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.groupName}>by - Dev Daily ©</p>

        <div className={styles.participants}>
          <span>Pedro Baffa</span>
          <span>Iann Nogueira Schmith</span>
          <span>Mateus Simões Marques</span>
          <span>Leonardo Albuquerque Avigro</span>
        </div>

        <p className={styles.affiliation}>
          Estudantes de Análise e Desenvolvimento de Sistemas (ADS)
          <br />
          Universidade São Judas Tadeu (USJT) - Campus Santana
        </p>
      </div>
    </footer>
  );
}
