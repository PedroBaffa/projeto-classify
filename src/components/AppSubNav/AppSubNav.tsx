 
import { NavLink } from 'react-router-dom';
import styles from './AppSubNav.module.css';

export function AppSubNav() {
  
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    <nav className={styles.appSubNav}>
      <NavLink to="/dashboard" className={getLinkClass}>Quadro de Aulas</NavLink>
      <NavLink to="/minhas-ucs" className={getLinkClass}>Minhas UCs</NavLink>
      <NavLink to="/relatorios" className={getLinkClass}>Relatórios</NavLink>
      <NavLink to="/solicitacoes" className={getLinkClass}>Solicitações</NavLink>
    </nav>
  );
}