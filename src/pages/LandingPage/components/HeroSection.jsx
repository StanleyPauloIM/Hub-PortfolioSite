// Seção de herói que apresenta o produto
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeroSection.module.css';
import Minimalist from '../../../assets/images/Minimalist.png'; // 👈 importa a imagem

const HeroSection = () => {
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
          <div className={styles.badge}>Novo • Construtor de Portfólios</div>

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

          {/* Chips com destaques */}
          <ul className={styles.chipList}>
            <li className={styles.chip}>Templates modernos</li>
            <li className={styles.chip}>Edição em tempo real</li>
            <li className={styles.chip}>Partilha instantânea</li>
          </ul>

          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              Começar Agora
            </button>
            <NavLink to="/templates" className="btn">
              Ver Exemplos
            </NavLink>
          </div>

          {/* Trust bar */}
          <div className={styles.trustBar}>
            <span className={styles.trustText}>Usado por criativos e estudantes</span>
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
