import React from 'react';
import styles from './Terms.module.css';
import HubGlobe from '../../assets/HubGlobe.png';
import { useI18n } from '../../i18n/I18nProvider';

export default function Terms() {
  const { t } = useI18n();
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img className={styles.logo} src={HubGlobe} alt="HUB logo" />
          <h1 className={styles.title}>{t('terms.title')}</h1>
        </div>
        <div className={styles.content}>
          <p>
            {t('terms.p1')}
          </p>
          <ul>
            <li>{t('terms.li1')}</li>
            <li>{t('terms.li2')}</li>
            <li>{t('terms.li3')}</li>
          </ul>
          <p>{t('terms.updated')}</p>
        </div>
      </div>
    </div>
  );
}
