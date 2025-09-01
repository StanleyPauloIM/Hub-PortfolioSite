import React from 'react';
import styles from './FeaturesSection.module.css';
import Connection from '../../../../assets/images/Connection.png';
import Universe from '../../../../assets/images/Universe.png';
import Beauty from '../../../../assets/images/Beauty.png';
import ProfilePic from '../../../../assets/images/profile.jpeg'; // 👉 mete a tua imagem aqui

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

      {/* Linha separadora */}
      <div className={styles.divider}></div>

      {/* Três cards com imagem + texto */}
      <div className={styles.cardsRow}>
        <div className={styles.card}>
          <div className={styles.imagePlaceholder}>
            <img src={Beauty} alt="Beauty" />
          </div>
          <p>Descrição curta sobre esta feature.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.imagePlaceholder}>
            <img src={Connection} alt="Connect" />
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

      {/* Linha separadora 2*/}
      <div className={styles.divider}></div>

      {/* Perfil / Desenvolvido por */}
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>
          <img src={ProfilePic} alt="Profile" />
        </div>
        <div className={styles.profileInfo}>
          <h3>Developed by</h3>
          <h2>Stanley Maguass</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet nulla ut
            libero faucibus tincidunt.
          </p>
          <div className={styles.contacts}>
            <a href="tel:+244900000000" className={styles.link}>
              +244 900 000 000
            </a>
            <a href="mailto:example@email.com" className={styles.link}>
              example@email.com
            </a>
          </div>
        </div>
      </div>


    </section>
  );
};

export default FeaturesSection;
