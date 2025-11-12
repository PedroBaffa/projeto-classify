// src/pages/TelaAlterarSenha/components/Step1_Senha.tsx
import React from 'react';

// Recebemos os estilos e a função para ir para o próximo passo
interface Step1Props {
  styles: any;
  onContinue: () => void;
}

export function Step1_Senha({ styles, onContinue }: Step1Props) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    onContinue(); // Chama a função para ir para a Etapa 2
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Altere sua senha!</h1>
      <p className={styles.subtitle}>
        Por ser seu primeiro login, solicitamos que você altere sua senha!
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="nova-senha">Nova senha:</label>
          <input type="password" id="nova-senha" className={styles.formInput} />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="confirma-senha">Confirme sua nova senha:</label>
          <input type="password" id="confirma-senha" className={styles.formInput} />
        </div>

        <p className={styles.constraintText}>
          *sua senha precisa conter pelo menos 7 letras, uma letra maiúscula, um caracter especial e 3 números
        </p>

        <button type="submit" className={styles.formButton}>
          Continuar
        </button>
      </form>
    </div>
  );
}