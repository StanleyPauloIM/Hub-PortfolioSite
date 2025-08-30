// Barra de navegação do topo
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import HubGlobe from '../../assets/HubGlobe.png';
import accountIcon from '../../assets/other_images/account_ex.jpg';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
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
