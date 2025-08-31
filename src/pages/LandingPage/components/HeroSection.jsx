// Seção de herói que apresenta o produto
import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
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
