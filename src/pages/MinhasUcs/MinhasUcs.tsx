import styles from "./MinhasUcs.module.css";
import { useEffect, useState } from "react";

interface UC {
  id: number;
  nome: string;
  salas: string[];
  dias: string[];
  cor: string;
  turmas: string[];
  periodos?: string[];
}

export function MinhasUCs() {
  const [allUCs, setAllUCs] = useState<UC[]>([]);
  const [displayUCs, setDisplayUCs] = useState<UC[]>([]);
  const [searchText, setSearchText] = useState("");
  const [periodFilter, setPeriodFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch('/api/mock-data');
        if (!resp.ok) return;
        const data = await resp.json();
        const ucs = data.ucs || [];
        if (!mounted) return;
        setAllUCs(ucs);
        setDisplayUCs(ucs);
      } catch (err) {
        
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  function applyFilter() {
    const q = searchText.trim().toLowerCase();
    const period = periodFilter;
    const filtered = allUCs.filter((uc) => {
      if (period && !(uc.periodos || []).includes(period)) return false;
      if (!q) return true;
      if (uc.nome.toLowerCase().includes(q)) return true;
      if ((uc.turmas || []).some(t => t.toLowerCase().includes(q))) return true;
      if ((uc.salas || []).some(s => s.toLowerCase().includes(q))) return true;
      return false;
    });
    setDisplayUCs(filtered);
  }

  useEffect(() => { applyFilter(); }, [periodFilter]);

  return (
    <div className={styles.container}>
      <div className={styles.headerBar}>
        <h1 className={styles.titulo}>Minhas Unidades Curriculares</h1>
        <div className={styles.controlsContainer}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Procurar UC..."
              className={styles.searchInput}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <select
            className={styles.filterDropdown}
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
          >
            <option value="">Todos os Períodos</option>
            <option value="matutino">Matutino</option>
            <option value="vespertino">Vespertino</option>
            <option value="noturno">Noturno</option>
          </select>
          <button className={styles.actionButton} onClick={applyFilter}>
            Pesquisar
          </button>
        </div>
      </div>

      <div className={styles.gridContainer}>
        {loading ? (
          <div>Carregando UCs...</div>
        ) : (
          displayUCs.map((uc) => (
            <div key={uc.id} className={`${styles.ucCard} ${styles[uc.cor]}`}>
              <h2 className={styles.ucTitulo}>{uc.nome}</h2>

              <div className={styles.detalheGrupo}>
                <h3 className={styles.detalheTitulo}>Salas:</h3>
                <div className={styles.pillsContainer}>
                  {uc.salas.map((sala, index) => (
                    <span key={index} className={styles.pill}>
                      {sala}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.detalheGrupo}>
                <h3 className={styles.detalheTitulo}>Dias da Semana:</h3>
                <div className={styles.pillsContainer}>
                  {uc.dias.map((dia, index) => (
                    <span key={index} className={styles.pill}>
                      {dia}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}