import React from 'react';

interface Step3Props {
  styles: any;
  onContinue: () => void;
}

export function Step3_Unidades({ styles, onContinue}: Step3Props) {
  const [nome, setNome] = React.useState('');
  const [unidades, setUnidades] = React.useState<string[]>([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const addUnidade = () => {
    const v = nome.trim();
    if (!v) return;
    setUnidades(prev => [...prev, v]);
    setNome('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) return setError('Usuário não identificado. Faça login novamente.');
      const resp = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, unidades })
      });
      if (!resp.ok) {
        const d = await resp.json();
        return setError(d.message || 'Erro ao salvar unidades');
      }
      onContinue();
    } catch {
      setError('Erro de conexão.');
    }
  };

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) return setLoading(false);
        const resp = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
        if (!resp.ok) return setLoading(false);
        const d = await resp.json();
        if (!mounted) return;
        const u = d?.user?.unidades || [];
        setUnidades(Array.isArray(u) ? u : []);
      } catch {
        
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Qual sua preferência para Unidades Curriculares?</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        
        {loading ? <p>Carregando unidades...</p> : null}
        <div className={styles.inputGroup}>
          <label htmlFor="materia-nome">Matéria(s) e/ou UC(s):</label>
          <div style={{display:'flex',gap:8}}>
            <input 
              type="text" 
              id="materia-nome" 
              className={styles.formInput}
              placeholder="Nome" 
              value={nome}
              onChange={(e)=>setNome(e.target.value)}
            />
            <button type="button" className={styles.formButton} onClick={addUnidade}>Adicionar</button>
          </div>
        </div>

        <div className={styles.pillContainer}>
          {unidades.map((u, i) => (
            <span key={i} className={`${styles.pill} ${styles.pillOrange}`}>{u}</span>
          ))}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}

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