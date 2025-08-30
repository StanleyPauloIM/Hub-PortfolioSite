// Barra de navegação do topo
import React from 'react';
import styles from './Navbar.module.css';
import HubGlobe from '../../assets/HubGlobe.png';
import accountIcon from '../../assets/account.png';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={HubGlobe} alt="Hub Globe" />
        <div className={styles.brandContainer}>
          <span className={styles.brand}>HUB</span>
          <div className={styles.brandGlow}></div>
        </div>
      </div>

      {/* Links */}
      <ul className={styles.navLinks}>
        <li><a href="/" className={styles.navLink}>Home</a></li>
        <li><a href="/signin" className={styles.navLink}>Entrar</a></li>
        <li>
          <div className={styles.profilePic}>
            <img src={accountIcon} alt="Account Icon" />
          </div>
        </li>
      </ul>
    </nav>
  );
}
