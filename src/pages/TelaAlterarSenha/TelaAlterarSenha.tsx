import React, { useState } from "react";
import styles from "./TelaAlterarSenha.module.css";
import { HeroLogo } from "../../components/HeroLogo/HeroLogo";
import { Step1_Senha } from "./components/Step1_Senha";
import { Step2_Preferencias } from "./components/Step2_Preferencias";
import { Step3_Unidades } from "./components/Step3_Unidades";
import { Step4_Finalizar } from "./components/Step4_Finalizar";

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
        {step === 1 && ( // Renderização do Step1
          <Step1_Senha styles={styles} onContinue={handleNextStep} />
        )}

        {step === 2 && ( // Renderização do Step2
          <Step2_Preferencias styles={styles} onContinue={handleNextStep} />
        )}

        {step === 3 && ( // Renderização do Step3
          <Step3_Unidades styles={styles} onContinue={handleNextStep} />
        )}

        {step === 4 && <Step4_Finalizar styles={styles} />}
      </div>

      <div className={styles.bottomBars}>
        <div className={styles.barOrange}></div>
        <div className={styles.barTeal}></div>
      </div>
    </div>
  );
}
