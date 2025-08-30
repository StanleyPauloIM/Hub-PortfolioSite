// Barra de navegação do topo
import React from 'react';
import styles from './Navbar.module.css';
import HubGlobe from '../../assets/HubGlobe.png';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={HubGlobe} alt="Hub Globe" />
        <span className={styles.brand}>HUB</span>
      </div>

      {/* Links */}
      <ul className={styles.navLinks}>
        <li><a href="/">Home</a></li>
        <li><a href="/signin">Entrar</a></li>
        <li>
          <div className={styles.profilePic}>
            <img src={HubGlobe} alt="HubGlobe" />
          </div>
        </li>
      </ul>
    </nav>
  );
}
