// Seção de herói que apresenta o produto
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeroSection.module.css';
import Minimalist from '../../../assets/images/Minimalist.png'; // 👈 importa a imagem
import { useI18n } from '../../../i18n/I18nProvider';

const HeroSection = () => {
  const { t } = useI18n();
  return (
    <section id="hero" className={styles.heroSection}>
      {/* Partículas flutuantes de fundo */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={styles.particle}
            style={{
              '--delay': `${Math.random() * 5}s`,
              '--size': `${Math.random() * 4 + 2}px`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Container principal dividido em 2 colunas */}
      <div className={styles.heroContainer}>
        
        {/* Coluna de texto */}
        <div className={styles.heroContent}>
          {/* Badge/Eyebrow */}
          <div className={styles.badge}>{t('landing.hero.badge')}</div>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleGradient}>{t('landing.hero.title1')}</span>
            <br />
            <span className={styles.titleGradient}>{t('landing.hero.title2')}</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            {t('landing.hero.subtitle')}
          </p>

          {/* Chips com destaques */}
          <ul className={styles.chipList}>
            <li className={styles.chip}>{t('landing.hero.chip1')}</li>
            <li className={styles.chip}>{t('landing.hero.chip2')}</li>
            <li className={styles.chip}>{t('landing.hero.chip3')}</li>
          </ul>

          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              {t('landing.hero.ctaPrimary')}
            </button>
            <NavLink to="/templates" className="btn">
              {t('landing.hero.ctaSecondary')}
            </NavLink>
          </div>

          {/* Trust bar */}
          <div className={styles.trustBar}>
            <span className={styles.trustText}>{t('landing.hero.trustText')}</span>
            <div className={styles.trustLogos}>
              <img src="https://cdn.simpleicons.org/behance/ffffff" alt="Behance" />
              <img src="https://cdn.simpleicons.org/figma/ffffff" alt="Figma" />
              <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" />
            </div>
          </div>
        </div>

        {/* Coluna da imagem */}
        <div className={styles.heroImageWrapper}>
          <img 
            src={Minimalist} 
            alt="Hero visual" 
            className={styles.heroImage} 
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
