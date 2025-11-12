import React from "react";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import styles from "./TelaInicial.module.css";

export const TelaInicial = () => {
  return (
    <div className={styles.heroContainer}>
      <HeroLogo />
    </div>
  );
};