import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (!user?.uid) return;
        const qRef = query(collection(db, 'users', user.uid, 'notifications'), orderBy('createdAt','desc'));
        const snap = await getDocs(qRef);
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch {}
    })();
  }, [user?.uid]);

  if (!user?.uid) return <div style={{padding:24}}>Entre para ver notificações.</div>;
  return (
    <div style={{padding:24}}>
      <h1>Notificações</h1>
      <ul style={{listStyle:'none', padding:0, display:'grid', gap:10}}>
        {items.map(n => (
          <li key={n.id} style={{border:'1px solid var(--border)', borderRadius:12, padding:10}}>
            <div style={{fontWeight:700}}>{n.title || n.type}</div>
            {n.slug ? <a href={`/p/${encodeURIComponent(n.slug)}`}>Ver portfólio</a> : null}
            <div style={{opacity:0.7, fontSize:12}}>{new Date(n.createdAt?.seconds ? n.createdAt.seconds*1000 : Date.now()).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
