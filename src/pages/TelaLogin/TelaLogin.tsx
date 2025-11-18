// src/pages/TelaLogin/TelaLogin.tsx

import { Link } from "react-router-dom"; // Importa o Link para navegação
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import styles from "./TelaLogin.module.css";

// Importa os ícones da animação
import capelo1 from "../../assets/icons/capelo1.svg";
import livro1 from "../../assets/icons/livro1.svg";
import teacher1 from "../../assets/icons/teacher1.svg";
import livros1 from "../../assets/icons/livros1.svg";
import capelo2 from "../../assets/icons/capelo2.svg";
import livro2 from "../../assets/icons/livro2.svg";
import teacher2 from "../../assets/icons/teacher2.svg";

export function TelaLogin() {
  return (
    <div className={styles.loginPage}>
      {/* --- PAINEL ESQUERDO (Com Animação) --- */}
      <div className={styles.leftPanel}>
        {/* Animação de fundo */}
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

        {/* Logo (na frente da animação) */}
        <div className={styles.heroWrapper}>
          <HeroLogo />
        </div>
      </div>

      {/* --- PAINEL DIREITO (Formulário) --- */}
      <div className={styles.rightPanel}>
        <h1 className={styles.title}>Bem-vindo!</h1>
        <p className={styles.subtitle}>É bom ter você aqui de novo.</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail ou RP:</label>
            <input type="text" id="email" className={styles.formInput} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" className={styles.formInput} />
          </div>

          {/* --- BOTÃO "ENTRAR" MODIFICADO --- */}
          {/* Simula o login e redireciona para a troca de senha */}
          <Link to="/primeiro-login" className={styles.formButton}>
            Entrar
          </Link>
        </form>

        <p className={styles.signupLink}>
          Professor, não tem uma conta ainda?
          <Link to="/cadastro"> Cadastre-se!</Link>
        </p>
      </div>
    </div>
  );
}
