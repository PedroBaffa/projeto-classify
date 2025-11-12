import React from 'react';

interface Step3Props {
  styles: any;
  onContinue: () => void; // Função chamada ao continuar para o próximo passo
}

export function Step3_Unidades({ styles, onContinue}: Step3Props) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Qual sua preferência para Unidades Curriculares?</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <div className={styles.inputGroup}>
          <label htmlFor="materia-nome">Matéria(s) e/ou UC(s):</label>
          <input 
            type="text" 
            id="materia-nome" 
            className={styles.formInput}
            placeholder="Nome" 
          />
        </div>

        <div className={styles.pillContainer}>
          <span className={`${styles.pill} ${styles.pillOrange}`}>Física</span>
          <span className={`${styles.pill} ${styles.pillPurple}`}>Matemática</span>
          <span className={`${styles.pill} ${styles.pillGray}`}>Cálculo 1</span>
          <span className={`${styles.pill} ${styles.pillTeal}`}>Cálculo 2</span>
        </div>

        <p className={styles.infoText}>
          Mova as UCs de acordo com a sua preferência. Quanto mais para cima e mais para a esquerda, maior a prioridade.
        </p>

        <button type="submit" className={styles.formButton}>
          Continuar
        </button>
      </form>
    </div>
  );
}