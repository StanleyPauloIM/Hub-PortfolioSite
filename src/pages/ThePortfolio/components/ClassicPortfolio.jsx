// ClassicPortfolio component: read-only render of a portfolio in a classic layout
import React from 'react';
import styles from './ClassicPortfolio.module.css';

function Section({ title, children }) {
  if (!children) return null;
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div>{children}</div>
    </section>
  );
}

export default function ClassicPortfolio({ data }) {
  if (!data) return null;
  const {
    theme = {},
    profile = {},
    about = {},
    contact = {},
    socials = {},
    skills = [],
    projects = [],
    certificates = [],
    diplomas = [],
    links = [],
    media = [],
  } = data || {};

  const cssVars = {
    '--c-primary': theme.primary || '#1e90ff',
    '--c-secondary': theme.secondary || '#b0b8c1',
    '--c-bg': theme.background || '#0b0b0b',
    '--c-text': theme.text || '#ffffff',
  };

  const hasAny = (arr) => Array.isArray(arr) && arr.length > 0;

  return (
    <div className={styles.wrapper} style={cssVars}>
      {/* Header */}
      <header className={styles.headerCard}>
        <div className={styles.headerLeft}>
          <div className={styles.avatarWrap}>
            {profile.avatarUrl ? (
              <img className={styles.avatar} src={profile.avatarUrl} alt="Avatar" />
            ) : (
              <div className={styles.avatarPlaceholder}>{(profile.name || 'U')[0]}</div>
            )}
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.name}>{profile.name || 'Your Name'}</h1>
            <div className={styles.title}>{profile.title || 'Your Role / Title'}</div>
            {(profile.location || contact.email || socials.github || socials.linkedin) && (
              <div className={styles.metaRow}>
                {profile.location && <span className={styles.metaItem}>📍 {profile.location}</span>}
                {contact.email && <span className={styles.metaItem}>✉️ {contact.email}</span>}
              </div>
            )}
            <div className={styles.socialRow}>
              {socials.github && (
                <a href={socials.github} className={styles.socialLink} target="_blank" rel="noreferrer">GitHub</a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} className={styles.socialLink} target="_blank" rel="noreferrer">LinkedIn</a>
              )}
              {socials.twitter && (
                <a href={socials.twitter} className={styles.socialLink} target="_blank" rel="noreferrer">X/Twitter</a>
              )}
              {socials.instagram && (
                <a href={socials.instagram} className={styles.socialLink} target="_blank" rel="noreferrer">Instagram</a>
              )}
              {contact.website && (
                <a href={contact.website} className={styles.socialLink} target="_blank" rel="noreferrer">Website</a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      {(about.summary || about.bio) && (
        <Section title="Sobre">
          <p className={styles.about}>{about.summary || about.bio}</p>
        </Section>
      )}

      {/* Skills */}
      {hasAny(skills) && (
        <Section title="Skills">
          <div className={styles.chips}>
            {skills.map((s, i) => (
              <span key={String(s)+i} className={styles.chip}>#{s}</span>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {hasAny(projects) && (
        <Section title="Projetos">
          <div className={styles.grid}>
            {projects.map((p, i) => (
              <article key={i} className={styles.card}>
                {p.imageUrl && (
                  <div className={styles.cardMedia}>
                    <img src={p.imageUrl} alt="Project" />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{p.title || 'Projeto'}</h4>
                  {p.description && <p className={styles.cardText}>{p.description}</p>}
                  {(p.link || p.videoUrl) && (
                    <div className={styles.cardLinks}>
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer">Visitar</a>}
                      {p.videoUrl && <a href={p.videoUrl} target="_blank" rel="noreferrer">Vídeo</a>}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* Certificates & Diplomas */}
      {(hasAny(certificates) || hasAny(diplomas)) && (
        <div className={styles.twoCol}>
          {hasAny(certificates) && (
            <Section title="Certificados">
              <ul className={styles.list}>
                {certificates.map((c, i) => (
                  <li key={i}>
                    <strong>{c.name || 'Certificado'}</strong>
                    {c.issuer && <span> • {c.issuer}</span>}
                    {c.year && <span> ({c.year})</span>}
                    {c.link && (
                      <span> – <a href={c.link} target="_blank" rel="noreferrer">Ver</a></span>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {hasAny(diplomas) && (
            <Section title="Diplomas">
              <ul className={styles.list}>
                {diplomas.map((d, i) => (
                  <li key={i}>
                    <strong>{d.degree || 'Grau'}</strong>
                    {d.school && <span> • {d.school}</span>}
                    {d.year && <span> ({d.year})</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      )}

      {/* Links */}
      {hasAny(links) && (
        <Section title="Links">
          <ul className={styles.list}>
            {links.map((l, i) => {
              const isImg = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(String(l.url||''));
              const host = (() => { try { return new URL(l.url).hostname; } catch { return ''; } })();
              return (
                <li key={i} className={styles.linkRow}>
                  {isImg ? (
                    <img className={styles.linkThumb} src={l.url} alt="thumb" />
                  ) : (
                    <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 1 0 7.07 7.07l1.71-1.71"/></svg>
                  )}
                  <a href={l.url} target="_blank" rel="noreferrer">{l.label || l.url}</a>
                  {host && <span className={styles.metaItem}>({host})</span>}
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {/* Media */}
      {hasAny(media) && (
        <Section title="Galeria">
          <div className={styles.mediaGrid}>
            {media.map((m, i) => (
              <div key={i} className={styles.mediaItem}>
                {m.type === 'video' ? (
                  <video src={m.url} controls />
                ) : (
                  <img src={m.url} alt="Media" />
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Contact */}
      {(contact.email || contact.phone || contact.phoneCode) && (
        <Section title="Contato">
          <div className={styles.contactBox}>
            {contact.email && <div>📧 {contact.email}</div>}
            {(contact.phone || contact.phoneCode) && <div>📞 {(contact.phoneCode||'') + (contact.phone? ' ' + contact.phone : '')}</div>}
          </div>
        </Section>
      )}
    </div>
  );
}

