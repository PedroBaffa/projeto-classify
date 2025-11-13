import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';

function AppHeaderPlaceholder() {
  return <header className={styles.appHeader}>[App Header Placeholder]</header>;
}
function AppSubNavPlaceholder() {
  return <nav className={styles.appSubNav}>[App SubNav Placeholder]</nav>;
}

export function DashboardLayout() {
  return (
    <div className={styles.dashboardContainer}>
      
      <AppHeaderPlaceholder />
      <AppSubNavPlaceholder />

      <main className={styles.dashboardContent}>
        <Outlet />
      </main>
      
    </div>
  );
}