import React, { useState } from "react";
import styles from "./TelaAlterarSenha.module.css";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import { Step1_Senha } from "./components/Step1_Senha";
import { Step2_Preferencias } from "./components/Step2_Preferencias";
import { Step3_Unidades } from "./components/Step3_Unidades"; // Importação do Step3

export function TelaAlterarSenha() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <HeroLogo />
        </div>
        {step === 1 && (
          <Step1_Senha styles={styles} onContinue={handleNextStep} />
        )}

        {step === 2 && (
          <Step2_Preferencias
            styles={styles}
            onContinue={handleNextStep}
          />
        )}

        {step === 3 && ( // Renderização do Step3
          <Step3_Unidades styles={styles} />
        )}
      </div>

      <div className={styles.bottomBars}>
        <div className={styles.barOrange}></div>
        <div className={styles.barTeal}></div>
      </div>
    </div>
  );
}
