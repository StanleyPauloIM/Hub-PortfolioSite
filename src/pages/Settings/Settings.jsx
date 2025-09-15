import React, { useState } from 'react';
import styles from './Settings.module.css';
import { useI18n } from '../../i18n/I18nProvider';
import { useAuth } from '../../auth/AuthProvider';
import { deleteUser, reauthenticateWithPopup, GoogleAuthProvider } from 'firebase/auth';

function SunIcon(props){return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>);} 
function MoonIcon(props){return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);} 

export default function Settings(){
  const { t, locale, setLocale } = useI18n();
  const { user } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const changeTheme = (theme) => { try { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); } catch {} };

  async function onDelete(){
    setErr(''); setMsg('');
    if (confirmText !== 'cErTeZa') { setErr('Texto de confirmação incorreto.'); return; }
    try {
      // Reauth if needed for sensitive operation
      try { await deleteUser(user); setMsg(t('settings.deleted')); setConfirmOpen(false); return; } catch (e) {
        if (e?.code === 'auth/requires-recent-login') {
          try { await reauthenticateWithPopup(user, new GoogleAuthProvider()); await deleteUser(user); setMsg(t('settings.deleted')); setConfirmOpen(false); return; } catch { setErr(t('settings.reauth')); return; }
        }
        setErr('Falha ao apagar conta.');
      }
    } catch { setErr('Falha ao apagar conta.'); }
  }

  return (
    <div className={styles.wrapper}>
      <h1>{t('settings.title')}</h1>

      {msg && <div className={styles.info}>{msg}</div>}
      {err && <div className={styles.error}>{err}</div>}

      <section className={styles.card}>
        <h2>{t('settings.language')}</h2>
        <div className={styles.row}>
          <button className={`btn ${styles.pill} ${locale==='pt'?styles.active:''}`} onClick={()=>setLocale('pt')}>Português</button>
          <button className={`btn ${styles.pill} ${locale==='en'?styles.active:''}`} onClick={()=>setLocale('en')}>English</button>
        </div>
      </section>

      <section className={styles.card}>
        <h2>{t('settings.theme')}</h2>
        <div className={styles.row}>
          <button className={`btn ${styles.pill}`} onClick={()=>changeTheme('dark')}><MoonIcon/> {t('settings.dark')}</button>
          <button className={`btn ${styles.pill}`} onClick={()=>changeTheme('light')}><SunIcon/> {t('settings.light')}</button>
        </div>
      </section>

      <section className={styles.card}>
        <h2>{t('settings.deleteTitle')}</h2>
        <p className={styles.muted}>{t('settings.deleteDesc')}</p>
        <button className={`btn ${styles.danger}`} onClick={()=>{ setConfirmOpen(true); setConfirmText(''); }}>{t('settings.delete')}</button>
      </section>

      {confirmOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal} role="dialog" aria-modal="true">
            <h3>{t('settings.deleteTitle')}</h3>
            <p className={styles.muted}>{t('settings.deleteDesc')}</p>
            <input className={styles.input} value={confirmText} onChange={(e)=>setConfirmText(e.target.value)} placeholder={t('settings.confirmPlaceholder')} />
            <div className={styles.actions}>
              <button className="btn" onClick={()=>setConfirmOpen(false)}>{t('settings.cancel')}</button>
              <button className={`btn ${styles.danger}`} onClick={onDelete}>{t('settings.confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

