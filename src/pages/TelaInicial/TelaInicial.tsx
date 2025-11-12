import React from "react";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import styles from "./TelaInicial.module.css"; 

export const TelaInicial = () => {
  return (
    // Este container é necessário para aplicar os estilos
    // de centralização da folha de estilos abaixo.
    <div className={styles.heroContainer}>
      <HeroLogo />
    </div>
  );
};