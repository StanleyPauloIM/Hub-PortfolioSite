// Seção de herói que apresenta o produto
import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <img
          src="/src/assets/HUBlogo_t512.png"
          alt="Hub Logo"
          className={styles.heroLogo}
        />
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Welcome to Hub – ThePortfolioWebsite</h1>
          <p className={styles.heroSubtitle}>Build your portfolio with styleeee.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
