// Public portfolio page by slug
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { db } from '../../firebase/firebase';
import { collection, getDocs, getDoc, addDoc, setDoc, deleteDoc, doc, limit, query, where, orderBy, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import ClassicPortfolio from '../ThePortfolio/templates/classic/ClassicPortfolio';
import styles from './PublicPortfolio.module.css';

export default function PublicPortfolio() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [posting, setPosting] = useState(false);
  const [text, setText] = useState('');

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
          const docSnap = snap.docs[0];
          const d = docSnap.data();
          const owner = d.ownerId;
          setOwnerId(owner);
          setLikes(Number(d.likes||0));

          // Tentar determinar estado de like do usuário
          try {
            if (user?.uid) {
              const likedDoc = await getDoc(doc(db, 'portfolios', owner, 'likes', user.uid));
              setLiked(likedDoc.exists());
            }
          } catch {}

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
        // Incrementa views uma vez por sessão/local (guard)
        try {
          const key = `hub_views_${owner}`;
          if (owner && !sessionStorage.getItem(key)) {
            const ref = doc(db, 'portfolios', owner);
            await updateDoc(ref, { views: increment(1), updatedAt: serverTimestamp() });
            sessionStorage.setItem(key, '1');
            // Notificação ao dono
            try {
              if (user?.uid && user.uid !== owner) {
                await addDoc(collection(db, 'users', owner, 'notifications'), {
                  receiverUid: owner,
                  actorUid: user.uid,
                  type: 'portfolio.visit',
                  title: 'Nova visita ao seu portfólio',
                  slug,
                  createdAt: serverTimestamp(),
                  read: false,
                });
              }
            } catch {}
          }
        } catch {}
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

  async function toggleLike() {
    try {
      if (!user?.uid) return;
      const likeRef = doc(db, 'portfolios', ownerId, 'likes', user.uid);
      const portRef = doc(db, 'portfolios', ownerId);
      if (!liked) {
        await setDoc(likeRef, { userId: user.uid, createdAt: serverTimestamp() });
        await updateDoc(portRef, { likes: increment(1), updatedAt: serverTimestamp() });
        setLiked(true); setLikes(v => v + 1);
        // Notificação ao dono
        try {
          if (user.uid !== ownerId) {
            await addDoc(collection(db, 'users', ownerId, 'notifications'), {
              receiverUid: ownerId,
              actorUid: user.uid,
              type: 'portfolio.like',
              title: 'Alguém gostou do seu portfólio',
              slug,
              createdAt: serverTimestamp(),
              read: false,
            });
          }
        } catch {}
      } else {
        await deleteDoc(likeRef);
        await updateDoc(portRef, { likes: increment(-1), updatedAt: serverTimestamp() });
        setLiked(false); setLikes(v => Math.max(0, v - 1));
      }
    } catch {}
  }

  async function postComment() {
    try {
      if (!user?.uid) return;
      const msg = text.trim(); if (!msg) return;
      setPosting(true);
      const coll = collection(db, 'portfolios', ownerId, 'comments');
      await addDoc(coll, {
        userId: user.uid,
        text: msg,
        createdAt: serverTimestamp(),
        actorDisplayName: user.displayName || 'User',
        actorPhotoURL: user.photoURL || '',
      });
      setText(''); setPosting(false);
      // Notificação ao dono
      try {
        if (user.uid !== ownerId) {
          await addDoc(collection(db, 'users', ownerId, 'notifications'), {
            receiverUid: ownerId,
            actorUid: user.uid,
            type: 'portfolio.comment',
            title: 'Novo comentário no seu portfólio',
            slug,
            createdAt: serverTimestamp(),
            read: false,
          });
        }
      } catch {}
      // Reload comments
      await loadComments();
    } catch { setPosting(false); }
  }

  async function loadComments() {
    try {
      const qRef = query(collection(db, 'portfolios', ownerId, 'comments'), orderBy('createdAt', 'desc'), limit(50));
      const snap = await getDocs(qRef);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setComments(list);
    } catch {}
  }

  useEffect(() => { if (ownerId) { loadComments(); } }, [ownerId]);

  async function deletePortfolio() {
    try {
      if (!user?.uid || user.uid !== ownerId) return;
      await deleteDoc(doc(db, 'portfolios', ownerId));
      // Opcional: limpar subcoleções/ficheiros via CF — não implementado aqui
      window.location.assign('/chooseurcharacter');
    } catch {}
  }

  return (
    <div className={styles.wrap} style={cssPreviewVars}>
      <div className={styles.actionsRow}>
        <button className={`btn ${liked ? styles.btnLiked : ''}`} onClick={toggleLike} aria-pressed={liked}>❤️ {likes}</button>
        {user?.uid === ownerId && (
          <button className="btn" onClick={deletePortfolio} style={{marginLeft:8}}>Eliminar</button>
        )}
      </div>
      <ClassicPortfolio data={data} />

      <div className={styles.commentsBox}>
        <h3>Comentários</h3>
        {user ? (
          <div className={styles.commentForm}>
            <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Escreva um comentário…" maxLength={1000} />
            <button className="btn" disabled={posting || !text.trim()} onClick={postComment}>{posting ? 'A enviar…' : 'Publicar'}</button>
          </div>
        ) : (
          <p>Faça login para comentar.</p>
        )}
        <ul className={styles.commentList}>
          {comments.map(c => (
            <li key={c.id} className={styles.commentItem}>
              {c.actorPhotoURL ? <img src={c.actorPhotoURL} alt="" className={styles.commentAvatar} /> : null}
              <div>
                <div className={styles.commentMeta}>@{(c.actorDisplayName||'user')} • {new Date(c.createdAt?.seconds ? c.createdAt.seconds*1000 : Date.now()).toLocaleString()}</div>
                <div>{c.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

