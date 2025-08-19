import React from 'react';
import styles from './Footer.module.css';

// Footer inferior que será usado em todas as páginas do site


export default function Footer() {
    return (
      <footer className={styles.Footer}>
        <span className={styles.copyright}>Hub - Todos direitos reservados 2025</span>
      </footer>
    );
  }
