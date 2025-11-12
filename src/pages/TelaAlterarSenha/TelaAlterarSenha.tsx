// src/pages/TelaAlterarSenha/TelaAlterarSenha.tsx

import React from "react";
import styles from "./TelaAlterarSenha.module.css";
// 1. Importa o nosso componente de logo original
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";

export function TelaAlterarSenha() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <HeroLogo />
        </div>

        {/* --- FORMULÁRIO --- */}
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Altere sua senha!</h1>
          <p className={styles.subtitle}>
            Por ser seu primeiro login, solicitamos que você altere sua senha!
          </p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="nova-senha">Nova senha:</label>
              <input
                type="password"
                id="nova-senha"
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirma-senha">Confirme sua nova senha:</label>
              <input
                type="password"
                id="confirma-senha"
                className={styles.formInput}
              />
            </div>

            <p className={styles.constraintText}>
              *sua senha precisa conter pelo menos 7 letras, uma letra
              maiúscula, um caracter especial e 3 números
            </p>

            <button type="submit" className={styles.formButton}>
              Continuar
            </button>
          </form>
        </div>
      </div>

      {/* --- BARRAS DECORATIVAS --- */}
      <div className={styles.bottomBars}>
        <div className={styles.barOrange}></div>
        <div className={styles.barTeal}></div>
      </div>
    </div>
  );
}
