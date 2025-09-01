import React from 'react';
import styles from './FeaturesSection.module.css';
import Universe from '../../../assets/images/Universe.png';
import Connect from '../../../assets/images/Connect.png';
import Beauty from '../../../assets/images/Beauty.png';

const FeaturesSection = () => {
  return (
    <section className={styles.featuresSection}>
      {/* Título principal */}
      <h2 className={styles.sectionTitle}>A PLACE FOR</h2>

      {/* Três colunas de texto */}
      <div className={styles.textColumns}>
        <div className={styles.textBlock}>
          <h3>Beauty</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl non magna suscipit viverra.</p>
        </div>
        <div className={styles.textBlock}>
          <h3>Connect</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Fusce nec turpis id orci.</p>
        </div>
        <div className={styles.textBlock}>
          <h3>Universe</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac dui at ligula elementum suscipit.</p>
        </div>
      </div>

      {/* Três cards com imagem + texto */}
      <div className={styles.cardsRow}>
        <div className={styles.card}>
          {/* 👉 Coloca imagem aqui */}
          <div className={styles.imagePlaceholder}>
            <img src={Beauty} alt="Beauty" />
          </div>
          <p>Descrição curta sobre esta feature.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.imagePlaceholder}>
            <img src={Connect} alt="Connect" />
          </div>
          <p>Texto explicando esta parte da experiência.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.imagePlaceholder}>
            <img src={Universe} alt="Universe" />
          </div>
          <p>Informação adicional sobre a comunidade/universo.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
