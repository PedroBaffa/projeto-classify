// src/pages/TelaAlterarSenha/TelaAlterarSenha.tsx

import React, { useState } from 'react';
import styles from './TelaAlterarSenha.module.css';
import { HeroLogo } from '../../components/HeroLogo/HeroLogo';

// 1. Importe os novos componentes (as etapas)
import { Step1_Senha } from './components/Step1_Senha';
import { Step2_Preferencias } from './components/Step2_Preferencias';

export function TelaAlterarSenha() {
  // 2. Crie o estado para controlar a etapa atual
  const [step, setStep] = useState(1); // Começa na etapa 1

  // 3. Função para avançar
  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        
        <div className={styles.logoWrapper}>
          <HeroLogo />
        </div>
        
        {/* --- RENDERIZAÇÃO CONDICIONAL --- */}
        {/* 4. Mostra a Etapa 1 OU a Etapa 2 */}
        
        {step === 1 && (
          <Step1_Senha 
            styles={styles} 
            onContinue={handleNextStep} 
          />
        )}

        {step === 2 && (
          <Step2_Preferencias 
            styles={styles} 
          />
        )}
        
      </div>
      
      {/* As barras decorativas continuam aqui */}
      <div className={styles.bottomBars}>
        <div className={styles.barOrange}></div>
        <div className={styles.barTeal}></div>
      </div>
    </div>
  );
}