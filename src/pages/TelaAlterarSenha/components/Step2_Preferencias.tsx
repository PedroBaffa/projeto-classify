import React from 'react';

interface Step2Props {
  styles: any;
  onContinue: () => void;
}

export function Step2_Preferencias({ styles, onContinue }: Step2Props) {
  const [matutino, setMatutino] = React.useState(false);
  const [vespertino, setVespertino] = React.useState(false);
  const [noturno, setNoturno] = React.useState(false);
  const [todos, setTodos] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) return setError('Usuário não identificado. Faça login novamente.');
      const prefs = { matutino, vespertino, noturno, todos };
      const resp = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preferencias: prefs })
      });
      if (!resp.ok) {
        const d = await resp.json();
        return setError(d.message || 'Erro ao salvar preferências');
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
        if (!email) return;
        const resp = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
        if (!resp.ok) return;
        const d = await resp.json();
        if (!mounted) return;
        const prefs = d?.user?.preferencias || {};
        setMatutino(Boolean(prefs.matutino));
        setVespertino(Boolean(prefs.vespertino));
        setNoturno(Boolean(prefs.noturno));
        setTodos(Boolean(prefs.todos));
      } catch {
        
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

    return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Qual sua preferência para horários?</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        {loading ? <p>Carregando preferências...</p> : null}
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.formCheckbox} checked={matutino} onChange={(e)=>setMatutino(e.target.checked)} />
            Prefiro o período <strong>matutino.</strong>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.formCheckbox} checked={vespertino} onChange={(e)=>setVespertino(e.target.checked)} />
            Prefiro o período <strong>vespertino.</strong>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.formCheckbox} checked={noturno} onChange={(e)=>setNoturno(e.target.checked)} />
            Prefiro o período <strong>noturno.</strong>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.formCheckbox} checked={todos} onChange={(e)=>setTodos(e.target.checked)} />
            Dou aula em <strong>todos os períodos.</strong>
          </label>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="submit" className={styles.formButton}>
          Continuar
        </button>
      </form>
    </div>
  );
}