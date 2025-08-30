// Seção de herói que apresenta o produto
import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      {/* Elementos decorativos */}
      <div className={styles.decorativeElements}>
        <div className={styles.glowElement}></div>
        <div className={styles.glowElement}></div>
      </div>

      {/* Conteúdo principal */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.titleGradient}>Constrói o teu</span>
          <br />
          <span className={styles.titleGradient}>portfólio com estilo</span>
        </h1>
        
        <p className={styles.heroSubtitle}>
          O espaço perfeito para mostrares o teu trabalho. 
          Cria, personaliza e partilha o teu portfólio profissional 
          com ferramentas avançadas e design moderno.
        </p>

        <div className={styles.ctaButtons}>
          <button className={styles.primaryButton}>
            Começar Agora
          </button>
          <button className={styles.secondaryButton}>
            Ver Exemplos
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
