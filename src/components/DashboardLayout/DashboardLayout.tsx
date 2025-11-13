import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { AppSubNav } from '../AppSubNav/AppSubNav';

export function DashboardLayout() {
  return (
    <div className={styles.dashboardContainer}>
      
      <AppHeader />
      <AppSubNav />

      <main className={styles.dashboardContent}>
        <Outlet />
      </main>
      
    </div>
  );
}