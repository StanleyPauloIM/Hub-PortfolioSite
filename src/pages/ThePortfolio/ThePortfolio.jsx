// Página que exibe o portfólio do utilizador (versão não editável)
import React, { useMemo, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './ThePortfolio.module.css';
import layoutStyles from '../ChooseUrCharacter/ChooseUrCharacter.module.css';
import exStyles from '../TemplateExample/TemplateExample.module.css';
import SidebarLayout from '../../components/layout/SidebarLayout/SidebarLayout';
import HubGlobe from '../../assets/HubGlobe.png';
import accountIcon from '../../assets/images/account_ex.jpg';
import defaultAvatar from '../../assets/images/account_ex.jpg';
import ClassicPortfolio from './templates/classic/ClassicPortfolio';
import GlowButton from '../../components/ui/GlowButton/GlowButton';
import { Icon as UIIcon } from '../../components/ui/Icons/Icons';
import useOnClickOutside, { useOnEscape } from '../../hooks/useOnClickOutside';
import { useAuth } from '../../auth/AuthProvider';
import { timeAgoShort } from '../../utils/timeAgo';

const Icon = {
  home: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/>
    </svg>
  ),
  search: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
    </svg>
  ),
  portfolio: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
  wand: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 6l12 12"/><path d="M14 6l4-4"/><path d="M4 14l-4 4"/>
    </svg>
  ),
  settings: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8.6 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.6 4.6a1.65 1.65 0 0 0 1-.33V4a2 2 0 1 1 4 0v.09c.36.14.69.34 1 .59.3.25.55.56.74.9.18.34.29.73.33 1.12.04.39 0 .78-.12 1.16"/>
    </svg>
  ),
  bell: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  arrow: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
};

const STORAGE_DRAFT = 'hub_portfolio_draft';
const STORAGE_PUBLISHED = 'hub_portfolio_published';

export default function ThePortfolio() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  // Sidebar appears minimized by default
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const Layout = SidebarLayout;
  const [notifOpen, setNotifOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [data, setData] = useState(null);

  // Controls for view interactions (like/comments)
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Close dropdowns on outside click / Escape
  const shareRef = React.useRef(null);
  const notifRef = React.useRef(null);
  const accountRef = React.useRef(null);
  useOnClickOutside(shareRef, () => setShareOpen(false), { enabled: shareOpen });
  useOnClickOutside(notifRef, () => setNotifOpen(false), { enabled: notifOpen });
  useOnClickOutside(accountRef, () => setAccountOpen(false), { enabled: accountOpen });
  useOnEscape(() => { setShareOpen(false); setNotifOpen(false); setAccountOpen(false); }, shareOpen || notifOpen || accountOpen);

  const setTheme = (t) => {
    try { document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t); } catch {}
  };

  useEffect(() => {
    try {
      const rawPub = localStorage.getItem(STORAGE_PUBLISHED);
      const rawDraft = localStorage.getItem(STORAGE_DRAFT);
      const parsed = rawPub ? JSON.parse(rawPub) : (rawDraft ? JSON.parse(rawDraft) : null);
      setData(parsed);
    } catch {
      setData(null);
    }
  }, []);

  const cssPreviewVars = useMemo(() => ({
    '--c-primary': data?.theme?.primary || '#1e90ff',
    '--c-secondary': data?.theme?.secondary || '#b0b8c1',
    '--c-bg': data?.theme?.background || '#0b0b0b',
    '--c-text': data?.theme?.text || '#ffffff',
  }), [data]);

  // URL para partilha
  const shareUrl = useMemo(() => {
    try {
      const u = new URL(window.location.href);
      u.pathname = '/theportfolio';
      u.search = '';
      u.hash = '';
      return u.toString();
    } catch { return window.location.origin + '/theportfolio'; }
  }, []);

  const pages = [
    { label: 'Início', path: '/' },
    { label: 'ChooseUrCharacter', path: '/chooseurcharacter' },
    { label: 'GenerateUrPortfolio', path: '/generateurportfolio' },
    { label: 'ThePortfolio', path: '/theportfolio' },
  ];

  // Identifier based on profile email (unique)
  const profileEmail = data?.profile?.email || 'theportfolio';
  const likesKey = `hub_port_view_likes_${profileEmail}`;
  const likedKey = `hub_port_view_liked_${profileEmail}`;
  const commentsKey = `hub_port_view_comments_${profileEmail}`;

  const [likes, setLikes] = useState(() => {
    try { return Number(localStorage.getItem(likesKey) || data?.stats?.likes || 0); } catch { return data?.stats?.likes || 0; }
  });
  const [liked, setLiked] = useState(() => {
    try { return localStorage.getItem(likedKey) === '1'; } catch { return false; }
  });
  useEffect(()=>{ try { localStorage.setItem(likedKey, liked ? '1' : '0'); } catch {} }, [likedKey, liked]);
  useEffect(()=>{ try { localStorage.setItem(likesKey, String(likes)); } catch {} }, [likesKey, likes]);

  const toggleLike = () => setLiked(v => { const nv = !v; setLikes(n => n + (nv ? 1 : -1)); return nv; });

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

  const [comments, setComments] = useState(() => {
    try {
      const raw = localStorage.getItem(commentsKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed)
? parsed.map(c => ({ liked: false, avatar: avatarPool[1], ...c, likes: Number(c?.likes || 0) }))
          : [];
      }
      return [];
    } catch { return []; }
  });
  useEffect(()=>{ try { localStorage.setItem(commentsKey, JSON.stringify(comments)); } catch {} }, [commentsKey, comments]);

  const [text, setText] = useState('');
  const textareaRef = React.useRef(null);
  const MAX_LINES = 50;
  const onTextInput = (e) => {
    const el = e.target; let val = el.value; const parts = String(val).split(/\r?\n/);
    if (parts.length > MAX_LINES) { val = parts.slice(0, MAX_LINES).join('\n'); el.value = val; }
    setText(val);
    try { el.style.height = 'auto'; const s = window.getComputedStyle(el); const lh = parseFloat(s.lineHeight || '20'); const maxH = lh * MAX_LINES; el.style.height = Math.min(el.scrollHeight, maxH) + 'px'; } catch {}
  };
  const post = () => { const msg = text.trim(); if (!msg) return; const avatar = loggedAvatar || avatarPool[Math.floor(Math.random()*avatarPool.length)]; setComments(c => [{ author: 'Convidado', text: msg, at: Date.now(), avatar, likes:0, liked:false }, ...c]); setText(''); try { if (textareaRef.current) { textareaRef.current.style.height = ''; } } catch {} };
  const toggleCommentLike = (idx) => setComments(cs => cs.map((c,i)=> { if (i !== idx) return c; const base = Number(c.likes || 0); const next = c.liked ? Math.max(0, base - 1) : base + 1; return { ...c, liked: !c.liked, likes: next }; }));

  return (
    <Layout>
      {({ styles: lay, mobileOpen, setMobileOpen }) => (
        <>
          {/* Conteúdo */}
          <main className={lay.content}>
        {/* Top bar */}
        <div className={layoutStyles.topBar}>
          <button className={layoutStyles.mobileMenuBtn} onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <span className={layoutStyles.hamburger} />
          </button>
          <div className={layoutStyles.pageTitleRow}>
            <button type="button" className={exStyles.backBtn} onClick={() => navigate(-1)} aria-label="Voltar">
              <span className={exStyles.backIcon}><UIIcon.arrowRight/></span>
              Voltar
            </button>
            <h1 className={layoutStyles.title}>The Portfolio</h1>
            <div className={layoutStyles.badge}>read‑only</div>
          </div>
          <div className={layoutStyles.topActions}>
            {/* Partilhar */}
            <div className={layoutStyles.shareWrap} ref={shareRef}>
              <GlowButton onClick={() => setShareOpen(v => !v)} aria-haspopup="menu" aria-expanded={shareOpen} aria-label="Partilhar"><UIIcon.share/> Partilhar</GlowButton>
              {shareOpen && (
                <div className={layoutStyles.shareDropdown} role="menu">
                  <a className={layoutStyles.shareLink} role="menuitem" href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">WhatsApp</a>
                  <a className={layoutStyles.shareLink} role="menuitem" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">Facebook</a>
                  <a className={layoutStyles.shareLink} role="menuitem" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Meu portfólio no HUB')}`} target="_blank" rel="noreferrer">X (Twitter)</a>
                  <button type="button" className={layoutStyles.shareLink} role="menuitem" onClick={() => { try { navigator.clipboard.writeText(shareUrl); } catch {} window.open('https://www.instagram.com/', '_blank'); }}>Instagram</button>
                  <button type="button" className={layoutStyles.shareLink} role="menuitem" onClick={() => { try { navigator.clipboard.writeText(shareUrl); } catch {} setShareOpen(false); }}>Copiar link</button>
                </div>
              )}
            </div>

            <div className={layoutStyles.bellWrap} ref={notifRef}>
              <button type="button" className={layoutStyles.iconBtn} onClick={() => setNotifOpen(v => !v)} aria-haspopup="menu" aria-expanded={notifOpen} aria-label="Notificações">
                <Icon.bell />
              </button>
              <span className={layoutStyles.bellDot} />
              {notifOpen && (
                <div className={layoutStyles.notifDropdown} role="menu">
                  <div className={layoutStyles.notifItem} role="menuitem">
                    <div className={layoutStyles.notifTitle}>Publicação</div>
                    <div className={layoutStyles.notifMeta}>Esta é a versão não editável</div>
                  </div>
                  <div className={layoutStyles.notifFooter}>Ver todas</div>
                </div>
              )}
            </div>
            <button type="button" className={layoutStyles.iconBtn} aria-label="Definições"><Icon.settings /></button>
            <div className={layoutStyles.accountWrap} ref={accountRef}>
              <div className={layoutStyles.avatar} onClick={() => setAccountOpen(v => !v)} role="button" aria-label="Conta"><img src={user?.photoURL || accountIcon} alt={user?.displayName ? `Perfil de ${user.displayName}` : 'Perfil'} /></div>
              {accountOpen && (
                <div className={layoutStyles.accountMenu} role="menu">
                  <NavLink to="/theportfolio" className={layoutStyles.accountLink} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/user.png" alt="" />
                    Perfil
                  </NavLink>
                  <NavLink to="/generateurportfolio" className={layoutStyles.accountLink} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/resume.png" alt="" />
                    Criar Portfólio
                  </NavLink>
                  <hr className={layoutStyles.accountDivider} />
                  <button className={`btn btn--small btn--full ${layoutStyles.themeBtn}`} onClick={() => setTheme('dark')}>Tema: Escuro</button>
                  <button className={`btn btn--small btn--full ${layoutStyles.themeBtn}`} onClick={() => setTheme('light')}>Tema: Claro</button>
                  <hr className={layoutStyles.accountDivider} />
                  <button className={layoutStyles.accountLink} onClick={async () => { try { await signOut(); } catch {} window.location.assign('/signin'); }} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/exit.png" alt="" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {!data ? (
          <div className={styles.empty}>
            <p>Nenhum portfólio publicado ainda.</p>
            <NavLink to="/generateurportfolio" className={`btn ${styles.link}`}>Criar agora</NavLink>
          </div>
        ) : (
          <div className={styles.viewWrap} style={cssPreviewVars}>
            {/* Like prompt */}
            <div className={styles.likeRow}>
              <span>Gostou do perfil? <strong>Deixe seu like</strong>.</span>
              <GlowButton onClick={toggleLike} className={liked ? exStyles.likeActive : ''} aria-pressed={liked} aria-label="Gostei">
                <UIIcon.heart/> {likes}
              </GlowButton>
            </div>

            {/* Tabs */}
            <div className={exStyles.tabs}>
              <button className={`${exStyles.tabBtn} ${exStyles.tabBtnActive}`}>Preview</button>
              <button className={`${exStyles.tabBtn} ${commentsOpen?exStyles.tabBtnActive:''}`} aria-pressed={commentsOpen} onClick={()=>setCommentsOpen(v=>!v)}>
                <span className={`${exStyles.tabDot} ${commentsOpen?exStyles.tabDotOn:''}`} /> Comentários <span className={exStyles.countPill}>{comments.length}</span>
              </button>
            </div>

            {/* Grid: canvas + comentários */}
            <div className={`${exStyles.exampleGrid} ${commentsOpen ? exStyles.gridWithSide : exStyles.gridNoSide}`}>
              <div className={exStyles.canvas}>
                <ClassicPortfolio data={data} />
              </div>

              <aside className={`${exStyles.sidePanel} ${commentsOpen ? exStyles.sideOpen : exStyles.sideClosed}`} aria-hidden={!commentsOpen}>
                <div className={exStyles.sideHeader}>
                  <h2 className={exStyles.sideTitle}>Comentários</h2>
                  <button className={exStyles.sideClose} onClick={()=>setCommentsOpen(false)}>Fechar</button>
                </div>
                <div className={exStyles.sideBody}>
                  <div className={`${exStyles.commentForm} ${exStyles.commentFormSticky}`}>
                    <div className={exStyles.commentRow}>
                      {loggedAvatar ? <img className={exStyles.commentAvatar} src={loggedAvatar} alt="" /> : null}
                      <textarea ref={el => (textareaRef.current = el)} value={text} onInput={(e)=>onTextInput(e)} onChange={(e)=>onTextInput(e)} rows={2} className={exStyles.commentInput} placeholder="Escreve um comentário…"/>
                      <GlowButton variant="icon" onClick={post} aria-label="Publicar"><UIIcon.arrowRight/></GlowButton>
                    </div>
                  </div>
                  <div className={exStyles.comments}>
                    {comments.map((c,i)=> (
                      <div key={i} className={exStyles.commentItem}>
                        {(c.avatar || avatarPool[1]) ? <img className={exStyles.commentAvatar} src={c.avatar||avatarPool[1]} alt="" /> : null}
                        <div>
                          <div className={exStyles.commentMeta}>{c.author} • {timeAgoShort(c.at)}</div>
                          <div>{c.text}</div>
                        </div>
                        <button className={`${exStyles.commentLike} ${c.liked?exStyles.commentLiked:''}`} onClick={()=>toggleCommentLike(i)}><UIIcon.heart/> {c.likes}</button>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
          </main>
        </>
      )}
    </Layout>
  );
}
