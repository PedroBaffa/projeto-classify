import React from "react";
import { Link } from "react-router-dom";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import styles from "../TelaLogin/TelaLogin.module.css"; // Reutiliza o CSS do Login

// --- 1. IMPORTE OS ÍCONES DA ANIMAÇÃO ---
import capelo1 from "../../assets/icons/capelo1.svg";
import livro1 from "../../assets/icons/livro1.svg";
import teacher1 from "../../assets/icons/teacher1.svg";
import livros1 from "../../assets/icons/livros1.svg";
import capelo2 from "../../assets/icons/capelo2.svg";
import livro2 from "../../assets/icons/livro2.svg";
import teacher2 from "../../assets/icons/teacher2.svg";

export function TelaCadastro() {
  return (
    <div className={styles.loginPage}>
      {/* --- PAINEL ESQUERDO (Idêntico ao Login) --- */}
      <div className={styles.leftPanel}>
        {/* --- 2. ADICIONE A ANIMAÇÃO AQUI --- */}
        <div className={styles.fallingItemsContainer}>
          <img
            src={capelo1}
            alt=""
            className={`${styles.item} ${styles.item1}`}
          />
          <img
            src={livro1}
            alt=""
            className={`${styles.item} ${styles.item2}`}
          />
          <img
            src={teacher1}
            alt=""
            className={`${styles.item} ${styles.item3}`}
          />
          <img
            src={livros1}
            alt=""
            className={`${styles.item} ${styles.item4}`}
          />
          <img
            src={capelo2}
            alt=""
            className={`${styles.item} ${styles.item5}`}
          />
          <img
            src={livro2}
            alt=""
            className={`${styles.item} ${styles.item6}`}
          />
          <img
            src={teacher2}
            alt=""
            className={`${styles.item} ${styles.item7}`}
          />
          <img
            src={capelo1}
            alt=""
            className={`${styles.item} ${styles.item8}`}
          />
          <img
            src={livro1}
            alt=""
            className={`${styles.item} ${styles.item9}`}
          />
          <img
            src={livros1}
            alt=""
            className={`${styles.item} ${styles.item10}`}
          />
        </div>

        <div className={styles.heroWrapper}>
          <HeroLogo />
        </div>
      </div>

      {/* --- PAINEL DIREITO (Conteúdo Instrucional) --- */}
      <div className={styles.rightPanel}>
        <h1 className={styles.title}>Bem-vindo!</h1>
        <p className={styles.subtitle}>É bom ter você aqui de novo.</p>

        <div className={styles.instrucoesCadastro}>
          <h2 className={styles.instrucoesTitulo}>Solicite seu cadastro!</h2>
          <p className={styles.instrucoesTexto}>
            Para fazer seu cadastro, vá até a(s) secretaria(s) da(s) sua(s)
            instituição(ões) e solicite seu cadastro para o{" "}
            <strong>Coordenador</strong>.
          </p>
          <p className={styles.instrucoesTexto}>
            Clique no botão para voltar à área de login.
          </p>
        </div>

        <Link to="/entrar" className={styles.formButton}>
          Continuar
        </Link>
      </div>
    </div>
  );
}
