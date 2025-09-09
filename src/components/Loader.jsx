// Loader overlay com animação do globo HUB no centro
import React from 'react';
import styles from './Loader.module.css';
import HubGlobe from '../assets/HubGlobe.png';

/**
 * Loader global do site
 * - Usa um backdrop full-screen
 * - Mostra o globo com rotação e um anel pulsante
 */
export default function Loader({ label = 'A carregar…', visible = true }) {
  return (
    <div className={[styles.backdrop, visible ? styles.show : ''].join(' ')} role="status" aria-live="polite" aria-label={label}>
      <div className={styles.box}>
        <div className={styles.globeWrap}>
          <img className={styles.globe} src={HubGlobe} alt="" aria-hidden />
          <span className={styles.ring} />
        </div>
        <div className={styles.text}>{label}</div>
      </div>
    </div>
  );
}
