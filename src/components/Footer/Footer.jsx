import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';

/**
 * FOOTER INOVADOR - Hub Portfolio Website
 * 
 * Este footer foi criado com elementos inovadores:
 * - Gradiente radial animado que muda de cor
 * - Partículas flutuantes que se movem
 * - Links sociais com hover effects
 * - Contador de visitantes animado
 * - Efeito de "typing" no texto principal
 * - Responsivo para mobile
 * 
 * Tecnologias utilizadas:
 * - CSS animations e keyframes
 * - React hooks (useState, useEffect)
 * - CSS custom properties para cores
 * - Flexbox e Grid para layout
 * 
 * @author YDK_Nley56
 * @version 1.0.0
 * @date 2025
 */

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
        {/* Seção do logo e descrição */}
        <div className={styles.brandSection}>
          <div className={styles.logoContainer}>
            <span className={styles.brandText}>HUB</span>
            <div className={styles.logoGlow}></div>
          </div>
          <p className={styles.tagline}>
            Construindo portfólios extraordinários
          </p>
        </div>

        {/* Links rápidos */}
        <div className={styles.quickLinks}>
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="/" className={styles.footerLink}>Home</a></li>
            <li><a href="/signin" className={styles.footerLink}>Entrar</a></li>
            <li><a href="#about" className={styles.footerLink}>Sobre</a></li>
            <li><a href="#contact" className={styles.footerLink}>Contato</a></li>
          </ul>
        </div>

        {/* Estatísticas */}
        <div className={styles.stats}>
          <h4>Estatísticas</h4>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{visitorCount.toLocaleString()}</span>
            <span className={styles.statLabel}>Visitantes</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>2025</span>
            <span className={styles.statLabel}>Ano Atual</span>
          </div>
        </div>

        {/* Redes sociais */}
        <div className={styles.socialLinks}>
          <h4>Conecte-se</h4>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon} title="GitHub">
              <span>🐙</span>
            </a>
            <a href="#" className={styles.socialIcon} title="LinkedIn">
              <span>💼</span>
            </a>
            <a href="#" className={styles.socialIcon} title="Twitter">
              <span>🐦</span>
            </a>
            <a href="#" className={styles.socialIcon} title="Instagram">
              <span>📸</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          © {currentYear} Hub - Todos os direitos reservados
        </span>
        <span className={styles.madeWith}>
          Feito com ❤️ e React
        </span>
      </div>
    </footer>
  );
}
