// Barra de navegação do topo
import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>Hub</span>
    </nav>
  );
}
