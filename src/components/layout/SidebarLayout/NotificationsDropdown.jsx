import React, { useEffect, useState } from 'react';
import layoutStyles from '../../../pages/ChooseUrCharacter/ChooseUrCharacter.module.css';
import { useAuth } from '../../../auth/AuthProvider';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

export default function NotificationsDropdown() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (!user?.uid) { setItems([]); return; }
        const qRef = query(collection(db, 'users', user.uid, 'notifications'), orderBy('createdAt','desc'), limit(5));
        const snap = await getDocs(qRef);
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch {}
    })();
  }, [user?.uid]);

  if (!user?.uid) return null;
  return (
    <div className={layoutStyles.bellWrap}>
      <button type="button" className={layoutStyles.iconBtn} onClick={() => setOpen(v => !v)} aria-haspopup="menu" aria-expanded={open} aria-label="Notificações">🔔</button>
      <span className={layoutStyles.bellDot} />
      {open && (
        <div className={layoutStyles.notifDropdown} role="menu">
          {items.length === 0 ? (
            <div className={layoutStyles.notifItem}>Sem notificações</div>
          ) : items.map(n => (
            <div key={n.id} className={layoutStyles.notifItem} role="menuitem">
              <div className={layoutStyles.notifTitle}>{n.title || n.type}</div>
              {n.slug ? <a className={layoutStyles.notifMeta} href={`/p/${encodeURIComponent(n.slug)}`}>Ver portfólio</a> : null}
            </div>
          ))}
          <a className={layoutStyles.notifFooter} href="/notifications">Ver todas</a>
        </div>
      )}
    </div>
  );
}
