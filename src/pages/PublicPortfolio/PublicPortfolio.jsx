// Public portfolio page by slug
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import ClassicPortfolio from '../ThePortfolio/templates/classic/ClassicPortfolio';
import styles from './PublicPortfolio.module.css';

export default function PublicPortfolio() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const qRef = query(collection(db, 'portfolios'), where('visibility','==','public'), where('slug','==', String(slug||'')), limit(1));
        const snap = await getDocs(qRef);
        if (snap.empty) {
          if (!cancelled) { setError('Portfolio não encontrado.'); setData(null); }
        } else {
          const d = snap.docs[0].data();
          // Reusa o shape do ClassicPortfolio (usa data semelhante ao GenerateUrPortfolio)
          const shaped = {
            template: 'classic',
            theme: { primary: '#1e90ff', secondary: '#b0b8c1', background: '#0b0b0b', text: '#ffffff' },
            profile: {
              name: d.displayName || d.profile?.name || '',
              title: d.title || d.profile?.title || '',
              location: d.city || d.profile?.location || '',
              gender: d.gender || d.profile?.gender || '',
              experience: d.exp || d.profile?.experience || '',
              avatarUrl: d.avatar || d.profile?.avatarUrl || '',
            },
            stats: { likes: d.likes || 0, views: d.views || 0 },
            about: { summary: '' },
            contact: { email: '', phone: '', website: '' },
            socials: { github: '', linkedin: '', twitter: '', instagram: '' },
            skills: Array.isArray(d.skills) ? d.skills : [],
            projects: [],
            certificates: [],
            diplomas: [],
            links: [],
            media: [],
            languages: [],
          };
          if (!cancelled) { setData(shaped); setError(''); }
        }
      } catch (e) {
        if (!cancelled) { setError('Ocorreu um erro a carregar o portfólio.'); setData(null); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  const cssPreviewVars = useMemo(() => ({
    '--c-primary': data?.theme?.primary || '#1e90ff',
    '--c-secondary': data?.theme?.secondary || '#b0b8c1',
    '--c-bg': data?.theme?.background || '#0b0b0b',
    '--c-text': data?.theme?.text || '#ffffff',
  }), [data]);

  if (loading) return <div className={styles.center}>A carregar…</div>;
  if (error) return (
    <div className={styles.center}>
      <p>{error}</p>
      <NavLink className="btn" to="/templates">Ver templates</NavLink>
    </div>
  );
  if (!data) return null;

  return (
    <div className={styles.wrap} style={cssPreviewVars}>
      <ClassicPortfolio data={data} />
    </div>
  );
}

