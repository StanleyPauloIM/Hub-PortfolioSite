// MinimalistPortfolio component: simple, content-first layout
import React from 'react';
import styles from './MinimalistPortfolio.module.css';
import { useI18n } from '../../../../i18n/I18nProvider';

export default function MinimalistPortfolio({ data }) {
  const { t } = useI18n();
  const d = data || {};
  const theme = d.theme || {};
  const profile = d.profile || {};
  const socials = d.socials || {};
  const projects = Array.isArray(d.projects) ? d.projects : [];

  return (
    <div
      className={styles.root}
      style={{
        // allow theming via inline CSS vars
        ['--c-primary']: theme.primary || '#111',
        ['--c-text']: theme.text || '#111',
        ['--c-bg']: theme.background || '#fff',
      }}
    >
      <header className={styles.header}>
        {profile.avatarUrl && (
          <img className={styles.avatar} src={profile.avatarUrl} alt={t('portfolio.alt.avatar')} />
        )}
        <div>
          <h1 className={styles.name}>{profile.name || t('portfolio.fallback.name')}</h1>
          <p className={styles.title}>{profile.title || t('portfolio.fallback.role')}</p>
        </div>
      </header>

      {(d.about?.summary || '').trim() && (
        <section className={styles.section}>
          <h2 className={styles.h2}>{t('portfolio.section.about')}</h2>
          <p className={styles.text}>{d.about.summary}</p>
        </section>
      )}

      {!!projects.length && (
        <section className={styles.section}>
          <h2 className={styles.h2}>{t('portfolio.section.projects')}</h2>
          <ul className={styles.projectList}>
            {projects.map((p, i) => (
              <li key={i} className={styles.projectItem}>
                <div className={styles.projectHead}>
                  <strong>{p.title || t('portfolio.fallback.project')}</strong>
                  {p.link && (
                    <a className={styles.link} href={p.link} target="_blank" rel="noreferrer">
                      {t('portfolio.cta.view')}
                    </a>
                  )}
                </div>
                {p.description && <p className={styles.text}>{p.description}</p>}
                {p.imageUrl && (
                  <div className={styles.media}>
                    <img src={p.imageUrl} alt={t('portfolio.alt.project')} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(socials.github || socials.linkedin || socials.twitter || socials.instagram) && (
        <footer className={styles.footer}>
          {socials.github && (
            <a className={styles.link} href={socials.github} target="_blank" rel="noreferrer">GitHub</a>
          )}
          {socials.linkedin && (
            <a className={styles.link} href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          )}
          {socials.twitter && (
            <a className={styles.link} href={socials.twitter} target="_blank" rel="noreferrer">Twitter</a>
          )}
          {socials.instagram && (
            <a className={styles.link} href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
          )}
        </footer>
      )}
    </div>
  );
}

