// Galeria de templates com cards de preview
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './TemplatesGallery.module.css';
import TemplateCard from '../../components/templates/TemplateCard/TemplateCard';
import { Icon } from '../../components/ui/Icons/Icons';

const templates = [
  {
    slug: 'classic',
    name: 'Classic Template',
    subtitle: 'Layout versátil e elegante',
    likes: 128,
    uses: 569,
    preview: 'classic',
    disabled: false,
  },
  {
    slug: 'minimalist',
    name: 'Minimalist Template',
    subtitle: 'Foco total no conteúdo',
    likes: 76,
    uses: 214,
    preview: 'minimalist',
    disabled: true,
  },
];


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
        <div className={styles.headLeft}>
          <h1 className={styles.title}>Escolhe um template</h1>
          <p className={styles.subtitle}>Explora modelos compatíveis com o nosso tema. Escolhe, pré‑visualiza e começa a personalizar.</p>
        </div>
        <div className={styles.headRight}>
          <span className={styles.countPill}>{templates.length} modelos</span>
          <NavLink className={styles.link} to="/generateurportfolio">Ir para criação</NavLink>
        </div>
      </header>

      <div className={styles.grid}>
        {templates.map(t => (
          <TemplateCard key={t.slug} t={t} onSave={onSave} />
        ))}
      </div>
    </div>
  );
}

