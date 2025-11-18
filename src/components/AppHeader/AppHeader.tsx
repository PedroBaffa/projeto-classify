import { useState } from 'react';
import styles from './AppHeader.module.css';
import { Link } from 'react-router-dom';

export function AppHeader() {
  const [isInstituicaoOpen, setIsInstituicaoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className={styles.appHeader}>
      <Link to="/dashboard" className={styles.logoLink}>
        <div className={styles.logo}>
          Classify
        </div>
      </Link>

      <div className={styles.userMenu}>
        <div className={styles.dropdownWrapper}>
          <div 
            className={styles.dropdownInstituicao}
            onClick={() => setIsInstituicaoOpen(!isInstituicaoOpen)}
          >
            <span>USJT - Santana</span>
            <span className={styles.dropdownIcon}>▼</span>
          </div>
          
          {isInstituicaoOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem}>UNINOVE - Paulista</div>
              <div className={styles.dropdownItem}>Mackenzie - Consolação</div>
            </div>
          )}
        </div>
        
        <div className={styles.dropdownWrapper}>
          <div 
            className={styles.profile}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <span>Professor Carmino</span>
            <div className={styles.profilePicPlaceholder}>C</div>
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
    </header>
  );
}