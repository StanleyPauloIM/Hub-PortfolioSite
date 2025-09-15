import React from 'react';
import styles from './FeaturesSection.module.css';
import Connection from '../../../../assets/images/Connection.png';
import Universe from '../../../../assets/images/Universe.png';
import Beauty from '../../../../assets/images/Beauty.png';
import ProfilePic from '../../../../assets/images/profile.jpeg'; // 👉 mete a tua imagem aqui
import { useI18n } from '../../../../i18n/I18nProvider';

const FeaturesSection = () => {
  const { t, locale } = useI18n();
  return (
    <section id="features" className={styles.featuresSection}>
      {/* Título principal */}
      <h2 className={styles.sectionTitle}>{t('landing.features.title')}</h2>

      {/* Três colunas de texto */}
      <div id="missao" className={styles.textColumns}>
        <div className={styles.textBlock}>
          <h3>{t('landing.features.col1')}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl non magna suscipit viverra.</p>
        </div>
        <div className={styles.textBlock}>
          <h3>{t('landing.features.col2')}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Fusce nec turpis id orci.</p>
        </div>
        <div className={styles.textBlock}>
          <h3>{t('landing.features.col3')}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac dui at ligula elementum suscipit.</p>
        </div>
      </div>

      {/* Linha separadora */}
      <div className={styles.divider}></div>

      {/* Cluster de imagens junto num único container */}
      <div className={styles.imageCluster}>
        <div className={styles.clusterItem}>
          <img src={Beauty} alt="Beauty" />
        </div>
        <div className={styles.clusterItem}>
          <img src={Connection} alt="Connect" />
        </div>
        <div className={styles.clusterItem}>
          <img src={Universe} alt="Universe" />
        </div>
      </div>

      {/* Linha separadora 2*/}
      <div className={styles.divider}></div>

      {/* Como funciona */}
      <section className={styles.howItWorks}>
        <h3 className={styles.subSectionTitle}>{locale==='en' ? 'Create your portfolio in minutes' : 'Cria o teu portfólio em minutos'}</h3>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <img src="https://img.icons8.com/ios-glyphs/48/user.png" alt="Escolher personagem" />
            </div>
            <h4 className={styles.stepTitle}>{t('landing.features.step1Title')}</h4>
            <p className={styles.stepText}>{t('landing.features.step1Text')}</p>
            <a className={`btn ${styles.stepLink}`} href="/chooseurcharacter">{t('landing.features.step1Cta')}</a>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <img src="https://img.icons8.com/ios-glyphs/48/settings.png" alt="Gerar portfólio" />
            </div>
            <h4 className={styles.stepTitle}>{t('landing.features.step2Title')}</h4>
            <p className={styles.stepText}>{t('landing.features.step2Text')}</p>
            <a className={`btn ${styles.stepLink}`} href="/generateurportfolio">{t('landing.features.step2Cta')}</a>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <img src="https://img.icons8.com/ios-glyphs/48/share.png" alt="Partilhar" />
            </div>
            <h4 className={styles.stepTitle}>{t('landing.features.step3Title')}</h4>
            <p className={styles.stepText}>{t('landing.features.step3Text')}</p>
            <a className={`btn ${styles.stepLink}`} href="/theportfolio">{t('landing.features.step3Cta')}</a>
          </div>
        </div>
      </section>

      {/* Perfil / Desenvolvido por */}
      <div id="sobre-nos" className={styles.profileSection}>
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
          <div id="contato" className={styles.contacts}>
            <a href="tel:+258852642255" className={styles.link}>
              <img className={styles.contactIcon} src="https://img.icons8.com/ios-glyphs/24/phone.png" alt="" aria-hidden="true" />
              +258 85 264 2255
            </a>
            <a href="mailto:Stanleypauloim@email.com" className={styles.link}>
              <img className={styles.contactIcon} src="https://img.icons8.com/ios-glyphs/24/new-post.png" alt="" aria-hidden="true" />
              Stanleypauloim@email.com
            </a>
          </div>
        </div>
      </div>


    </section>
  );
};

export default FeaturesSection;
