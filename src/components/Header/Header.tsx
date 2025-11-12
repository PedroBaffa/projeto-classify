import React, { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./Header.module.css";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom"; // 1. Importe o <Link>

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className={styles.header}>
      {/* 2. FAÇA O LOGO SER UM LINK PARA A HOME */}
      <Link to="/" className={styles.logoLink}>
        <img className={styles.logo} alt="Logo" src={logo} />
      </Link>

      <button className={styles.hamburgerIcon} onClick={toggleMenu}>
        ☰
      </button>

      <div
        className={`${styles.navContainer} ${
          menuAberto ? styles.navAberto : ""
        }`}
      >
        {/* 3. ADICIONE AS PROPS 'href' AOS BOTÕES */}
        <Button variant="nav" href="/atuacao">
          Atuação
        </Button>
        <Button variant="nav" href="/servicos">
          Serviços
        </Button>
        <Button variant="nav" href="/suporte">
          Suporte
        </Button>
        <Button variant="nav" href="/sobre-nos">
          Sobre Nós
        </Button>
        <Button variant="primary" href="/entrar">
          Entrar
        </Button>
      </div>
    </header>
  );
}
