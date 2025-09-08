import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import HubLogo from '../../assets/HUBlogo_t512.png';
import GitHubLogo from '../../assets/images/GitHub-Logo.png';
import LinkedInLogo from '../../assets/images/LinkedIn-Logo.png';
import XLogo from '../../assets/images/X-Logo.png';
import InstagramLogo from '../../assets/images/Instagram-Logo.png';

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentYear] = useState(new Date().getFullYear());

  // Simular contador de visitantes
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      {/* Partículas flutuantes */}
      <div className={styles.particles}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.particle} style={{ '--delay': `${i * 0.5}s` }}></div>
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className={styles.footerContent}>
        {/* Logo + tagline */}
        <div className={styles.brandSection}>
          <img src={HubLogo} alt="Hub Logo" className={styles.hubLogo} />
          <p className={styles.tagline}>Construindo portfólios extraordinários</p>
        </div>

        {/* Links rápidos */}
        <div className={styles.quickLinks}>
          <h4>Links</h4>
          <ul>
            <li><a href="/" className={styles.footerLink}>Home</a></li>
            <li><a href="/signin" className={styles.footerLink}>Entrar</a></li>
            <li><a href="#about" className={styles.footerLink}>Sobre</a></li>
            <li><a href="#contact" className={styles.footerLink}>Contato</a></li>
          </ul>
        </div>

        {/* Estatísticas + redes sociais */}
        <div className={styles.stats}>
          <h4>Visits</h4>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{visitorCount.toLocaleString()}</span>
            <span className={styles.statLabel}>Visitantes</span>
          </div>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}><img src={GitHubLogo} alt="GitHub" /></a>
            <a href="#" className={styles.socialIcon}><img src={LinkedInLogo} alt="LinkedIn" /></a>
            <a href="#" className={styles.socialIcon}><img src={XLogo} alt="X" /></a>
            <a href="#" className={styles.socialIcon}><img src={InstagramLogo} alt="Instagram" /></a>
          </div>
        </div>

        {/* Contato */}
        <div className={styles.contactSection}>
          <h4>Contact</h4>
          <form className={styles.contactForm}>
            <input 
              type="email" 
              placeholder="Digite seu email" 
              className={styles.contactInput} 
            />
            <button type="submit" className={styles.contactButton}>→</button>
          </form>
        </div>
      </div>

      {/* Barra inferior */}
      <div className={styles.bottomBar}>
        <span>© {currentYear} Hub - Todos os direitos reservados</span>
        <span>Feito com ❤️ e React</span>
      </div>
    </footer>
  );
}
