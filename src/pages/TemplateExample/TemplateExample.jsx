// Página de preview do template escolhido com dados de exemplo
import React, { useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styles from './TemplateExample.module.css';
import ClassicPortfolio from '../ThePortfolio/templates/classic/ClassicPortfolio';
import MinimalistPortfolio from '../ThePortfolio/templates/minimalist/MinimalistPortfolio';

const makeExample = (slug) => {
  const isClassic = slug === 'classic';
  return {
    template: slug,
    theme: isClassic
      ? { primary: '#1e90ff', secondary: '#b0b8c1', background: '#0b0b0b', text: '#ffffff' }
      : { primary: '#111111', secondary: '#6b7280', background: '#ffffff', text: '#111111' },
    profile: { name: isClassic ? 'Liam O\'Connor' : 'Alex Turner', title: isClassic ? 'Visual Artist' : 'Creative Director', location: 'Maputo, MZ', avatarUrl: '' },
    stats: { likes: 5200, views: 27500 },
    about: { summary: 'Portfólio de exemplo com projetos, certificados e ligações.' },
    contact: { email: 'example@hub.dev', phone: '+258 84 000 0000', website: 'https://hub.dev' },
    socials: { github: 'https://github.com/', linkedin: 'https://linkedin.com/', twitter: 'https://x.com/', instagram:'https://instagram.com/' },
    skills: ['React','Vite','Design','UI'],
    projects: [
      { title: 'Landing Page', description: 'Página institucional moderna.', link: 'https://example.com', imageUrl: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop' },
      { title: 'Design System', description: 'Biblioteca de componentes.', link: 'https://example.com', imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop' },
      { title: 'Dashboard', description: 'KPIs e métricas.', link: 'https://example.com', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' },
    ],
    certificates: [],
    diplomas: [],
    links: [
      { label: 'Behance', url: 'https://www.behance.net/' },
      { label: 'Figma', url: 'https://www.figma.com/' },
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop' },
    ],
  };
};

export default function TemplateExample() {
  const { slug = 'classic' } = useParams();
  const data = useMemo(() => makeExample(slug), [slug]);
  const isDisabled = slug === 'minimalist';

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <NavLink to="/templates" className={styles.link}>← Voltar</NavLink>
        <h1 className={styles.title}>Exemplo: {slug}</h1>
        <div />
      </header>

      {isDisabled ? (
        <div className={styles.soon}>O template Minimalist estará disponível em breve.</div>
      ) : (
        <div className={styles.canvas}>
          {slug === 'classic' ? (
            <ClassicPortfolio data={data} />
          ) : (
            <MinimalistPortfolio data={data} />
          )}
        </div>
      )}
    </div>
  );
}

