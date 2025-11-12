import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer'; 
import styles from './Layout.module.css';
import capelo1 from '../../assets/icons/capelo1.svg';
import capelo2 from '../../assets/icons/capelo2.svg';
import livro1 from '../../assets/icons/livro1.svg';
import livro2 from '../../assets/icons/livro2.svg';
import livros1 from '../../assets/icons/livros1.svg';
import teacher1 from '../../assets/icons/teacher1.svg';
import teacher2 from '../../assets/icons/teacher2.svg';

export function Layout() {
  return (
    <div className={styles.container}>
      
      <div className={styles.fallingItemsContainer}>
        <img src={capelo1} alt="" className={`${styles.item} ${styles.item1}`} />
        <img src={livro1} alt="" className={`${styles.item} ${styles.item2}`} />
        <img src={teacher1} alt="" className={`${styles.item} ${styles.item3}`} />
        <img src={livros1} alt="" className={`${styles.item} ${styles.item4}`} />
        <img src={capelo2} alt="" className={`${styles.item} ${styles.item5}`} />
        <img src={livro2} alt="" className={`${styles.item} ${styles.item6}`} />
        <img src={teacher2} alt="" className={`${styles.item} ${styles.item7}`} />
        <img src={capelo1} alt="" className={`${styles.item} ${styles.item8}`} />
        <img src={livro1} alt="" className={`${styles.item} ${styles.item9}`} />
        <img src={livros1} alt="" className={`${styles.item} ${styles.item10}`} />
      </div>

      <Header />

      <main className={styles.mainContentArea}>
        <Outlet /> 
      </main>

      <Footer />
      
    </div>
  );
}