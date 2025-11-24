import { useState, useEffect } from 'react';
import styles from './AppHeader.module.css';
import { Link } from 'react-router-dom';

export function AppHeader() {
  const [isInstituicaoOpen, setIsInstituicaoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string>('');
  const [instituicoes, setInstituicoes] = useState<string[]>([]);
  const [selectedUnidade, setSelectedUnidade] = useState<string | null>(null);
  

  
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        
        const email = localStorage.getItem('userEmail');
        let userResp: any = null;

        
        if (email) {
          try {
            const r = await fetch(`/api/user?email=${encodeURIComponent(email)}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
            if (r.ok) {
              const payload = await r.json();
              userResp = payload && payload.user ? payload.user : payload;
            } else {
              
            }
          } catch (e) {
            
            console.warn('AppHeader: /api/user fetch failed', e);
          }
        }

        
        try {
          const r2 = await fetch('/api/mock-data', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
          if (r2.ok) {
            const data = await r2.json();
            
            if (Array.isArray(data.instituicoes) && data.instituicoes.length && mounted) {
              setInstituicoes(data.instituicoes);
              setSelectedUnidade((prev) => prev ?? data.instituicoes[0]);
            }
            if (!userResp) userResp = data.users && data.users.length ? data.users[0] : null;
          } else {
            
          }
        } catch (e) {
          
          console.warn('AppHeader: /api/mock-data fetch failed', e);

          
          try {
            const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
            const url = `http://${host}:2985/api/mock-data`;
            const r3 = await fetch(url, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
            if (r3.ok) {
              const d3 = await r3.json();
              
              if (Array.isArray(d3.instituicoes) && d3.instituicoes.length && mounted) {
                setInstituicoes(d3.instituicoes);
                setSelectedUnidade((prev) => prev ?? d3.instituicoes[0]);
              }
              if (!userResp) userResp = d3.users && d3.users.length ? d3.users[0] : null;
            } else {
              
            }
          } catch (ee) {
            
            console.warn('AppHeader: direct backend fetch failed', ee);
          }
        }

        if (mounted) {
          if (userResp) {
            const name = userResp.nome ?? userResp.name ?? null;
            setUserName(name);
            setUserInitial(name ? String(name).trim().charAt(0).toUpperCase() : '');
            
          } else {
            
          }
        }
      } catch (e) {
        
        console.warn('AppHeader: unexpected error', e);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  return (
    <header className={styles.appHeader}>
      <Link to="/dashboard" className={styles.logoLink}>
        <div className={styles.logo}>Classify</div>
      </Link>

      <div className={styles.rightArea}>
        <div className={styles.userMenu}>
          <div className={styles.dropdownWrapper}>
            <div
              className={styles.dropdownInstituicao}
              onClick={() => setIsInstituicaoOpen(!isInstituicaoOpen)}
            >
              <span>{selectedUnidade ?? 'Instituição'}</span>
              <span className={styles.dropdownIcon}>▼</span>
            </div>

            {isInstituicaoOpen && (
              <div className={styles.dropdownMenu}>
                {instituicoes.length === 0 && (
                  <div className={styles.dropdownItem}>Nenhuma instituição</div>
                )}
                {instituicoes.map((u) => (
                  <div
                    key={u}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setSelectedUnidade(u);
                      setIsInstituicaoOpen(false);
                    }}
                  >
                    {u}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.dropdownWrapper}>
            <div
              className={styles.profile}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <span>{userName ?? 'Convidado'}</span>
              <div className={styles.profilePicPlaceholder}>{userInitial}</div>
            </div>

            {isProfileOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/" className={`${styles.dropdownItem} ${styles.logoutButton}`}>
                  Sair
                </Link>
              </div>
            )}
          </div>
        </div>

        <div style={{ fontSize: 11, color: '#fff', marginLeft: 12, maxWidth: 420 }} />
      </div>
    </header>
  );
}

 