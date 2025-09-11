// Galeria de templates com cards de preview
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './TemplatesGallery.module.css';
import MinimalistImg from '../../assets/images/Minimalist.png';
import HubGlobe from '../../assets/HubGlobe.png';

const Icon = {
  star: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
  ),
  flag: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
  ),
  eye: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  save: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
};

const templates = [
  {
    slug: 'classic',
    name: 'Classic Template',
    subtitle: 'Layout versátil e elegante',
    rating: 5.0,
    uses: 569,
    preview: 'classic',
    disabled: false,
  },
  {
    slug: 'minimalist',
    name: 'Minimalist Template',
    subtitle: 'Foco total no conteúdo',
    rating: 4.8,
    uses: 214,
    preview: 'minimalist',
    disabled: true,
  },
];

function Preview({ kind }) {
  if (kind === 'minimalist') {
    return (
      <div className={`${styles.preview} ${styles.minimal}`}> 
        <img src={MinimalistImg} alt="Minimalist preview" />
      </div>
    );
  }
  // classic fallback
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

function TemplateCard({ t, onSave }) {
  const navigate = useNavigate();
  const handleView = () => {
    if (t.disabled) return;
    navigate(`/templates/${t.slug}`);
  };
  const handleSave = () => onSave(t.slug);

  return (
    <div className={`${styles.card} ${t.disabled ? styles.disabled : ''}`} onClick={handleView} role="button" tabIndex={0}>
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
          <button className={`${styles.btn} ${styles.btnGhost}`} onClick={(e)=>{ e.stopPropagation(); handleView(); }} disabled={t.disabled}>
            <Icon.eye /> Ver
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={(e)=>{ e.stopPropagation(); handleSave(); }}>
            <Icon.save /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesGallery() {
  const navigate = useNavigate();

  const onSave = (slug) => {
    try {
      // Marca escolha do template e prepara um rascunho se ainda não existir
      localStorage.setItem('hub_selected_template', slug);
      const KEY = 'hub_portfolio_draft';
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.template = slug;
        localStorage.setItem(KEY, JSON.stringify(parsed));
      } else {
        const seed = {
          template: slug,
          theme: slug === 'classic'
            ? { primary: '#1e90ff', secondary: '#b0b8c1', background: '#0b0b0b', text: '#ffffff' }
            : { primary: '#111111', secondary: '#666', background: '#ffffff', text: '#111111' },
          profile: { name: '', title: '', location: '', avatarUrl: '' },
          stats: { likes: 0, views: 0 },
          about: { summary: '' },
          contact: { email: '', phone: '', website: '' },
          socials: { github: '', linkedin: '', twitter: '', instagram: '' },
          skills: [],
          projects: [],
          certificates: [],
          diplomas: [],
          links: [],
          media: [],
        };
        localStorage.setItem(KEY, JSON.stringify(seed));
      }
    } catch {}
    navigate('/generateurportfolio');
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Escolhe um template</h1>
        <NavLink className={styles.link} to="/generateurportfolio">Ir para criação</NavLink>
      </header>

      <div className={styles.grid}>
        {templates.map(t => (
          <TemplateCard key={t.slug} t={t} onSave={onSave} />
        ))}
      </div>
    </div>
  );
}

