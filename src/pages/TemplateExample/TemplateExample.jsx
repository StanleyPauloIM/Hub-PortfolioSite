// Página de preview do template escolhido com dados de exemplo
import React, { useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styles from './TemplateExample.module.css';
import ClassicPortfolio from '../ThePortfolio/templates/classic/ClassicPortfolio';
import MinimalistPortfolio from '../ThePortfolio/templates/minimalist/MinimalistPortfolio';

const makeExample = (slug) => {
  const isClassic = slug === 'classic';
  // Imagem de avatar (livre/Unsplash)
  const avatar = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=512&auto=format&fit=crop';
  return {
    template: slug,
    theme: isClassic
      ? { primary: '#1e90ff', secondary: '#b0b8c1', background: '#0b0b0b', text: '#ffffff' }
      : { primary: '#111111', secondary: '#6b7280', background: '#ffffff', text: '#111111' },
    profile: {
      name: 'Gertrudes Mapulaqua',
      title: 'Product Designer & Frontend Developer',
      location: 'Maputo, Moçambique',
      avatarUrl: avatar,
    },
    stats: { likes: 8700, views: 112000 },
    about: {
      summary:
        'Designer de produto e desenvolvedora frontend apaixonada por transformar ideias em experiências digitais elegantes. Trabalho com pesquisa, prototipagem e implementação – do Figma ao React – focando em acessibilidade, performance e uma estética moderna.',
    },
    contact: { email: 'gertrudes.mapulaqua@hub.dev', phone: '+258 84 555 1234', website: 'https://hub.dev/gertrudes' },
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://x.com/',
      instagram: 'https://www.instagram.com/',
    },
    skills: [
      'UX Research','UI Design','Design Systems','Prototipagem','Acessibilidade','React','TypeScript','Vite','Tailwind','Storybook','Figma','Motion',
    ],
    projects: [
      {
        title: 'Portal Educacional – UEM',
        description:
          'Redesign completo do portal de cursos com foco em acessibilidade AA, navegação clara e métricas de satisfação +38%.',
        link: 'https://example.com/edu',
        imageUrl:
          'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Design System “Indico”',
        description:
          'Criação de um sistema de design multi‑marca, com tokens, bibliotecas e documentação viva (Storybook).',
        link: 'https://example.com/indico-ds',
        imageUrl:
          'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Dashboard de E‑commerce',
        description:
          'Integração de analytics e funil de conversão. Renderização reativa com charts e filtros avançados.',
        link: 'https://example.com/commerce-dash',
        imageUrl:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'App de Eventos “Maputo Nights”',
        description:
          'Exploração de UI com dark mode, mapas e partilha social. +18k downloads em 6 meses.',
        link: 'https://example.com/maputo-nights',
        imageUrl:
          'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    certificates: [
      {
        name: 'Google UX Design Professional Certificate',
        issuer: 'Google / Coursera',
        year: '2024',
        link: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
      },
      {
        name: 'React Avançado – Performance & Patterns',
        issuer: 'Alura',
        year: '2023',
        // exemplo de imagem como “ficheiro”
        fileType: 'image',
        fileUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
        fileName: 'Certificado React Avançado',
      },
      {
        name: 'Acessibilidade Web (WCAG 2.2)',
        issuer: 'Deque University',
        year: '2023',
        link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    ],
    diplomas: [
      {
        school: 'Universidade Eduardo Mondlane',
        degree: 'Licenciatura em Engenharia Informática',
        year: '2021',
        link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
      {
        school: 'Mimo Design Academy',
        degree: 'Pós‑graduação em Product Design',
        year: '2022',
        fileType: 'image',
        fileUrl: 'https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=1200&auto=format&fit=crop',
        fileName: 'Diploma Product Design',
      },
    ],
    links: [
      { label: 'Behance', url: 'https://www.behance.net/' },
      { label: 'Figma Community', url: 'https://www.figma.com/community' },
      { label: 'Website', url: 'https://hub.dev/gertrudes' },
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1200&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec4b2cc?q=80&w=1200&auto=format&fit=crop' },
    ],
  };
};

import { Icon } from '../../components/ui/Icons/Icons';
import GlowButton from '../../components/ui/GlowButton/GlowButton';
import defaultAvatar from '../../assets/images/account_ex.jpg';
import layoutStyles from '../ChooseUrCharacter/ChooseUrCharacter.module.css';

function useLocalNumber(key, initial) {
  const [n, setN] = React.useState(() => {
    const raw = localStorage.getItem(key);
    return raw ? Number(raw) : initial;
  });
  React.useEffect(()=>{ localStorage.setItem(key, String(n)); }, [key, n]);
  return [n, setN];
}

// Share dropdown styled like ThePortfolio/GenerateUrPortfolio
function ShareDropdown({ open, onClose, url }) {
  const shareText = 'Meu portfólio no HUB';
  const onCopy = async () => { try { await navigator.clipboard.writeText(url); } catch {} onClose?.(); };
  return (
    open ? (
      <div className={layoutStyles.shareDropdown} role="menu">
        <a className={layoutStyles.shareLink} role="menuitem" href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className={layoutStyles.shareLink} role="menuitem" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">Facebook</a>
        <a className={layoutStyles.shareLink} role="menuitem" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">X (Twitter)</a>
        <button type="button" className={layoutStyles.shareLink} role="menuitem" onClick={onCopy}>Copiar link</button>
      </div>
    ) : null
  );
}

export default function TemplateExample() {
  const { slug = 'classic' } = useParams();
  const data = useMemo(() => makeExample(slug), [slug]);
  const isDisabled = slug === 'minimalist';
  const shareUrl = (typeof window !== 'undefined') ? window.location.href : '';

  const [commentsOpen, setCommentsOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [likes, setLikes] = useLocalNumber(`hub_template_likes_${slug}`, 128);
  const [liked, setLiked] = React.useState(() => localStorage.getItem(`hub_template_liked_${slug}`) === '1');
  React.useEffect(()=>{ localStorage.setItem(`hub_template_liked_${slug}`, liked ? '1' : '0'); }, [slug, liked]);

  const toggleLike = () => { setLiked(v => { const nv = !v; setLikes(n => n + (nv ? 1 : -1)); return nv; }); };

  // Comments store
  const commentsKey = `hub_template_comments_${slug}`;
  const avatarPool = [
    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=128&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=128&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=128&auto=format&fit=crop',
  ];

  const loggedAvatar = (() => {
    try {
      const pub = JSON.parse(localStorage.getItem('hub_portfolio_published')||'null');
      const draft = JSON.parse(localStorage.getItem('hub_portfolio_draft')||'null');
      const url = pub?.profile?.avatarUrl || draft?.profile?.avatarUrl;
      return (url && String(url).trim()) ? url : defaultAvatar;
    } catch { return defaultAvatar; }
  })();
  const [comments, setComments] = React.useState(() => {
    try {
      const raw = localStorage.getItem(commentsKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed)
          ? parsed.map(c => ({ likes: 0, liked: false, avatar: avatarPool[1], ...c, likes: Number(c?.likes || 0) }))
          : [];
      }
      return [
        { author: 'Ana', text: 'Uau! Layout muito limpo e profissional 👏', at: Date.now()-86400000, avatar: avatarPool[0], likes: 4, liked:false },
        { author: 'Paulo', text: 'Adorei as cores e a secção de projetos!', at: Date.now()-43200000, avatar: avatarPool[1], likes: 2, liked:false },
        { author: 'Marta', text: 'Isso inspira! Mal posso esperar para criar o meu.', at: Date.now()-3600000, avatar: avatarPool[2], likes: 1, liked:false },
      ];
    } catch { return []; }
  });
  React.useEffect(()=>{ try { localStorage.setItem(commentsKey, JSON.stringify(comments)); } catch {} }, [commentsKey, comments]);
  const [text, setText] = React.useState('');
  const textareaRef = React.useRef(null);
  const MAX_LINES = 50;
  const onTextInput = (e) => {
    // Enforce max lines and auto-resize
    const el = e.target;
    let val = el.value;
    const parts = String(val).split(/\r?\n/);
    if (parts.length > MAX_LINES) {
      val = parts.slice(0, MAX_LINES).join('\n');
      el.value = val;
    }
    setText(val);
    try {
      el.style.height = 'auto';
      const s = window.getComputedStyle(el);
      const lh = parseFloat(s.lineHeight || '20');
      const maxH = lh * MAX_LINES;
      el.style.height = Math.min(el.scrollHeight, maxH) + 'px';
    } catch {}
  };

  const post = () => {
    const msg = text.trim();
    if (!msg) return;
    const avatar = loggedAvatar || avatarPool[Math.floor(Math.random()*avatarPool.length)];
    setComments(c => [{ author: 'Convidado', text: msg, at: Date.now(), avatar, likes:0, liked:false }, ...c]);
    setText('');
    try { if (textareaRef.current) { textareaRef.current.style.height = ''; } } catch {}
  };

  const toggleCommentLike = (idx) => setComments(cs => cs.map((c,i)=> {
    if (i !== idx) return c;
    const base = Number(c.likes || 0);
    const next = c.liked ? Math.max(0, base - 1) : base + 1;
    return { ...c, liked: !c.liked, likes: next };
  }));

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <NavLink to="/templates" className={styles.link}>← Voltar</NavLink>
        <h1 className={styles.title}>Exemplo: {slug}</h1>
        <div className={styles.actionsBar}>
          <button className={`${styles.actionBtn} ${liked ? styles.likeActive : ''}`} onClick={toggleLike}><Icon.heart/> {likes}</button>
          <div className={layoutStyles.shareWrap}>
            <GlowButton onClick={() => setShareOpen(v => !v)} aria-haspopup="menu" aria-expanded={shareOpen} aria-label="Partilhar">
              Partilhar
            </GlowButton>
            <ShareDropdown open={shareOpen} onClose={() => setShareOpen(false)} url={shareUrl} />
          </div>
        </div>
      </header>

      {isDisabled ? (
        <div className={styles.soon}>O template Minimalist estará disponível em breve.</div>
      ) : (
        <>
          <div className={styles.tabs}>
            <button className={`${styles.tabBtn} ${styles.tabBtnActive}`}>Preview</button>
            <button className={`${styles.tabBtn} ${commentsOpen?styles.tabBtnActive:''}`} aria-pressed={commentsOpen} onClick={()=>setCommentsOpen(v=>!v)}>
              <span className={`${styles.tabDot} ${commentsOpen?styles.tabDotOn:''}`} /> Comentários <span className={styles.countPill}>{comments.length}</span>
            </button>
          </div>

          <div className={styles.exampleGrid}>
            <div className={styles.canvas}>
              {slug === 'classic' ? (
                <ClassicPortfolio data={data} />
              ) : (
                <MinimalistPortfolio data={data} />
              )}
            </div>

            <aside className={`${styles.sidePanel} ${commentsOpen ? styles.sideOpen : ''}`} aria-hidden={!commentsOpen}>
              <div className={styles.sideHeader}>
                <h2 className={styles.sideTitle}>Comentários</h2>
                <button className={styles.sideClose} onClick={()=>setCommentsOpen(false)}>Fechar</button>
              </div>
              <div className={styles.sideBody}>
                <div className={`${styles.commentForm} ${styles.commentFormSticky}`}>
                  <div className={styles.commentRow}>
                    <img className={styles.commentAvatar} src={loggedAvatar} alt="" />
                    <textarea ref={el => (textareaRef.current = el)} value={text} onInput={(e)=>onTextInput(e)} onChange={(e)=>onTextInput(e)} rows={2} className={styles.commentInput} placeholder="Escreve um comentário…"/>
                    <GlowButton variant="icon" onClick={post} aria-label="Publicar"><Icon.arrowRight/></GlowButton>
                  </div>
                </div>
                <div className={styles.comments}>
                  {comments.map((c,i)=> (
                    <div key={i} className={styles.commentItem}>
                      <img className={styles.commentAvatar} src={c.avatar||avatarPool[1]} alt="" />
                      <div>
                        <div className={styles.commentMeta}>{c.author} • {new Date(c.at).toLocaleString()}</div>
                        <div>{c.text}</div>
                      </div>
                      <button className={`${styles.commentLike} ${c.liked?styles.commentLiked:''}`} onClick={()=>toggleCommentLike(i)}><Icon.heart/> {c.likes}</button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}

