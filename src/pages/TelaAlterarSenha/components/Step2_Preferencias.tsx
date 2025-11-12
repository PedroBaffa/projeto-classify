import React from 'react';

interface Step2Props {
  styles: any;
  onContinue: () => void;
}

export function Step2_Preferencias({ styles, onContinue }: Step2Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(); 
  };

    return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Qual sua preferência para horários?</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.formCheckbox} />
            Prefiro o período <strong>matutino.</strong>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.formCheckbox} />
            Prefiro o período <strong>vespertino.</strong>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.formCheckbox} />
            Prefiro o período <strong>noturno.</strong>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.formCheckbox} />
            Dou aula em <strong>todos os períodos.</strong>
          </label>
        </div>

        <button type="submit" className={styles.formButton}>
          Continuar
        </button>
      </form>
    </div>
  );
}