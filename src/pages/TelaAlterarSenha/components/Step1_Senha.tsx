// src/pages/TelaAlterarSenha/components/Step1_Senha.tsx
import React, { useState } from 'react';

// Recebemos os estilos e a função para ir para o próximo passo
interface Step1Props {
  styles: any;
  onContinue: () => void;
}

export function Step1_Senha({ styles, onContinue }: Step1Props) {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [error, setError] = useState('');

  const validarSenha = (senha: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d.*\d.*\d)[A-Za-z\d!@#$%^&*]{7,}$/;
    return regex.test(senha);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validarSenha(novaSenha)) {
      setError('A senha não atende aos critérios especificados.');
      return;
    }

    if (novaSenha !== confirmaSenha) {
      setError('As senhas não correspondem.');
      return;
    }

    try {
      const response = await fetch('/api/alterar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha: novaSenha })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Erro ao alterar a senha.');
        return;
      }

      onContinue(); // Vai para o próximo passo
    } catch {
      setError('Erro de conexão. Tente novamente.');
    }
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
          <input
            type="password"
            id="nova-senha"
            className={styles.formInput}
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirma-senha">Confirme sua nova senha:</label>
          <input
            type="password"
            id="confirma-senha"
            className={styles.formInput}
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
          />
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

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