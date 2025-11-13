import React from 'react';
import styles from './AppHeader.module.css';

export function AppHeader() {
  return (
    <header className={styles.appHeader}>
      
      <div className={styles.logo}>
        Classify
      </div>

      <div className={styles.userMenu}>
        <div className={styles.dropdownInstituicao}>
          <span>Nome da instituição</span>
          <span className={styles.dropdownIcon}>▼</span>
        </div>
        
        <div className={styles.profile}>
          <span>Professor Joaquim</span>
          <div className={styles.profilePicPlaceholder}>J</div>
        </div>
      </div>

    </header>
  );
}