// Reusable Template card for gallery list
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TemplateCard.module.css';
import HubGlobe from '../../../assets/HubGlobe.png';
import MinimalistImg from '../../../assets/images/Minimalist.png';
import { Icon } from '../../ui/Icons/Icons';

function Preview({ kind }) {
  if (kind === 'minimalist') {
    return (
      <div className={`${styles.preview} ${styles.minimal}`}>
        <img src={MinimalistImg} alt="Minimalist preview" />
      </div>
    );
  }
  return (
    <div className={`${styles.preview} ${styles.classic}`}>
      <div className={styles.banner} />
      <div className={styles.avatarCircle}>
        <img src={HubGlobe} alt="icon" />
      </div>
      <div className={styles.lines}>
        <div />
        <div />
      </div>
    </div>
  );
}

export default function TemplateCard({ t, onSave }) {
  const navigate = useNavigate();
  const onView = () => { if (!t.disabled) navigate(`/templates/${t.slug}`); };
  const onDoSave = (e) => { e.stopPropagation(); onSave?.(t.slug); };

  return (
    <div className={`${styles.card} ${t.disabled ? styles.disabled : ''}`} onClick={onView} role="button" tabIndex={0}>
      <div className={styles.folderTab} />
      <Preview kind={t.preview} />
      <div className={styles.cardBody}>
        <div className={styles.cardTitleRow}>
          <div>
            <h3 className={styles.cardTitle}>{t.name}</h3>
            <div className={styles.cardSubtitle}>{t.subtitle}</div>
          </div>
          {t.disabled && <span className={styles.badge}>Brevemente</span>}
        </div>

        <div className={styles.metaRow}>
          <span className={styles.meta}><Icon.star /> {t.rating.toFixed(1)}</span>
          <span className={styles.meta}><Icon.flag /> {t.uses}</span>
          <span className={styles.meta}><Icon.eye /> Preview</span>
        </div>

        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnGhost}`} onClick={(e)=>{ e.stopPropagation(); onView(); }} disabled={t.disabled}>
            <Icon.eye /> Ver
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onDoSave}>
            <Icon.save /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

