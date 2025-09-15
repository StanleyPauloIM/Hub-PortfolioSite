import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import styles from './Account.module.css';

export default function Account() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  if (!user) return null;

  async function onUploadAvatar(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr(''); setMsg('');
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const r = ref(storage, `avatars/${user.uid}.${ext}`);
      await uploadBytes(r, file, { contentType: file.type });
      const url = await getDownloadURL(r);
      setPhotoURL(url);
      setMsg('Avatar carregado. Não se esqueça de Guardar.');
    } catch (e) {
      setErr('Falha ao enviar avatar.');
    } finally {
      setBusy(false);
    }
  }

  async function onSave() {
    setBusy(true); setErr(''); setMsg('');
    try {
      await updateProfile(user, { displayName: displayName.trim(), photoURL: photoURL || null });
      setMsg('Perfil atualizado.');
    } catch (e) {
      setErr('Não foi possível atualizar o perfil.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1>Conta</h1>
      {err && <div className={styles.error}>{err}</div>}
      {msg && <div className={styles.info}>{msg}</div>}

      <div className={styles.row}>
        <label>Nome a exibir</label>
        <input className={styles.input} value={displayName} maxLength={80} onChange={e=>setDisplayName(e.target.value)} />
      </div>

      <div className={styles.row}>
        <label>Avatar</label>
        <div className={styles.avatarRow}>
          {photoURL ? <img className={styles.avatar} src={photoURL} alt="Avatar" /> : <div className={styles.placeholder}>Sem foto</div>}
          <input type="file" accept="image/*" onChange={onUploadAvatar} disabled={busy} />
        </div>
      </div>

      <div className={styles.actions}>
        <button className="btn" onClick={onSave} disabled={busy}>Guardar</button>
      </div>
    </div>
  );
}
