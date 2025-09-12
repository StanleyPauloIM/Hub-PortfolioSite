// ClassicPortfolio component: read-only render of a portfolio in a classic layout
import React, { useState } from 'react';
import styles from './ClassicPortfolio.module.css';
import PdfThumb from '../../../../components/ui/PdfThumb/PdfThumb';

function Section({ title, children }) {
  if (!children) return null;
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div>{children}</div>
    </section>
  );
}

// Helper: format as 'K' when >= 1000
const fmtK = (n) => {
  const v = Math.max(0, Number(n) || 0);
  if (v < 1000) return String(v);
  return `${Math.round(v / 1000)}K`;
};

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
    languages = [],
  } = data || {};

  const cssVars = (() => {
    const primary = theme.primary || '#1e90ff';
    const secondary = theme.secondary || '#b0b8c1';
    const bg = theme.background || '#0b0b0b';
    const text = theme.text || '#ffffff';

    const toRGB = (hex) => {
      try {
        const h = String(hex).trim();
        const m = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(h);
        if (!m) return null;
        let v = m[1].toLowerCase();
        if (v.length === 3) v = v.split('').map(c => c + c).join('');
        const num = parseInt(v, 16);
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
      } catch { return null; }
    };
    const rgb = toRGB(bg) || { r: 11, g: 11, b: 11 };
    const luminance = (0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b) / 255;
    const dark = luminance < 0.5;
    const darkVars = {
      '--p-surface-1': 'rgba(20,20,20,0.98)',
      '--p-surface-2': 'rgba(12,12,12,0.60)',
      '--p-surface-3': 'rgba(255,255,255,0.06)',
      '--p-border': 'rgba(255,255,255,0.12)',
      '--p-border-soft': 'rgba(255,255,255,0.08)',
      '--p-shadow': 'rgba(0,0,0,0.35)',
      '--p-icon': '#b0b8c1',
    };
    const lightVars = {
      '--p-surface-1': 'rgba(255,255,255,0.98)',
      '--p-surface-2': 'rgba(255,255,255,0.75)',
      '--p-surface-3': 'rgba(0,0,0,0.04)',
      '--p-border': 'rgba(0,0,0,0.14)',
      '--p-border-soft': 'rgba(0,0,0,0.08)',
      '--p-shadow': 'rgba(0,0,0,0.15)',
      '--p-icon': '#64748b',
    };

    return {
      '--c-primary': primary,
      '--c-secondary': secondary,
      '--c-bg': bg,
      '--c-text': text,
      ...(dark ? darkVars : lightVars),
    };
  })();

  const hasAny = (arr) => Array.isArray(arr) && arr.length > 0;

  const [expanded, setExpanded] = useState({ proj: false, cert: false, dip: false, med: false });

  const isImg = (u) => /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(String(u||''));
  const isPdfU = (u) => /\.pdf($|\?)/i.test(String(u||''));
  const nameFromUrl = (u) => { try { const base = new URL(u).pathname.split('/').pop() || 'PDF'; return decodeURIComponent(base); } catch { return 'PDF'; } };

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
            {(profile.location || profile.gender || contact.email || socials.github || socials.linkedin) && (
              <div className={styles.metaRow}>
                {profile.location && <span className={styles.metaItem}>📍 {profile.location}</span>}
                {profile.gender && <span className={styles.metaItem}>🧑 {profile.gender}</span>}
                {contact.email && <span className={styles.metaItem}>✉️ {contact.email}</span>}
              </div>
            )}
            {/* Stats: likes & views */}
            <div className={styles.statsRow}>
              <span className={styles.stat} title="Likes">
                <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {fmtK(data?.stats?.likes ?? 0)}
              </span>
              <span className={styles.stat} title="Views">
                <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {fmtK(data?.stats?.views ?? 0)}
              </span>
            </div>
      <div className={styles.socialRow}>
        {socials.github && (
          <a href={socials.github} className={styles.socialLink} target="_blank" rel="noreferrer">
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3"/><path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 18 3.77 5.07 5.07 0 0 0 17.91 1S16.73.65 13 2.48a13.38 13.38 0 0 0-8 0C1.27.65.09 1 .09 1A5.07 5.07 0 0 0 0 3.77 5.44 5.44 0 0 0 1.5 7.9c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 7 18.13V22"/></svg>
            GitHub
          </a>
        )}
        {socials.linkedin && (
          <a href={socials.linkedin} className={styles.socialLink} target="_blank" rel="noreferrer">
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="13" rx="2"/><path d="M7 9V5a5 5 0 0 1 10 0v4"/></svg>
            LinkedIn
          </a>
        )}
        {socials.twitter && (
          <a href={socials.twitter} className={styles.socialLink} target="_blank" rel="noreferrer">
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.5c1.6 12-14 12-18 6 2 0 4-1 5-2-2-1-3-4-1-6 2 2 4 3 7 3-1-5 6-7 9-3z"/></svg>
            X/Twitter
          </a>
        )}
        {socials.instagram && (
          <a href={socials.instagram} className={styles.socialLink} target="_blank" rel="noreferrer">
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            Instagram
          </a>
        )}
        {contact.website && (
          <a href={contact.website} className={styles.socialLink} target="_blank" rel="noreferrer">
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>
            Website
          </a>
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
            {(expanded.proj ? projects : projects.slice(0,5)).map((p, i) => (
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
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer"><svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 1 0 7.07 7.07l1.71-1.71"/></svg>Visitar</a>}
                      {p.videoUrl && <a href={p.videoUrl} target="_blank" rel="noreferrer"><svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>Vídeo</a>}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.moreWrap}>
            {media.length > 5 && !expanded.med && (
              <button type="button" className={styles.moreBtn} onClick={()=>setExpanded(e=>({...e, med:true}))}>Ver mais…</button>
            )}
            {expanded.med && (
              <button type="button" className={styles.moreBtn} onClick={()=>setExpanded(e=>({...e, med:false}))}>Ocultar</button>
            )}
          </div>
        </Section>
      )}

      {/* Certificates & Diplomas */}
      {(hasAny(certificates) || hasAny(diplomas)) && (
        <div className={styles.twoCol}>
          {hasAny(certificates) && (
            <Section title="Certificados">
              <div className={styles.grid}>
                {(expanded.cert ? certificates : certificates.slice(0,5)).map((c, i) => {
                  const isImgLink = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(String(c.link||''));
                  const isPdfLink = /\.pdf($|\?)/i.test(String(c.link||''));
                  const host = (() => { try { return new URL(c.link).hostname; } catch { return ''; } })();
                  const hasImgFile = c.fileType === 'image' && c.fileUrl;
                  const hasPdfFile = c.fileType === 'pdf' && c.fileUrl;
                  return (
                    <article key={i} className={styles.card}>
                      {(hasImgFile || hasPdfFile || isImgLink || isPdfLink) && (
                        <div className={styles.cardMedia}>
{hasImgFile && (()=>{ const fname = c.fileName || nameFromUrl(c.fileUrl||c.link||''); return (
                          <div className={styles.imgCard}>
                            <div className={styles.imgHeader}>
                              <svg className={styles.imgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                              <span className={styles.imgName}>{fname}</span>
                            </div>
                            <div className={styles.imgPreview}><img src={c.fileUrl} alt="Certificado"/></div>
                          </div>
                        )})()}
{hasPdfFile && (()=>{ const fname = c.fileName || nameFromUrl(c.link||''); return (
                            <div className={styles.pdfCard}>
                              <div className={styles.pdfHeader}>
                                <svg className={styles.pdfIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10v10H7z"/></svg>
                                <span className={styles.pdfName}>{fname}</span>
                              </div>
                              <PdfThumb src={c.fileUrl} fileName={fname} height={104} />
                            </div>
                          ); })()}
{!hasImgFile && !hasPdfFile && isImgLink && (()=>{ const fname = nameFromUrl(c.link); return (
                          <div className={styles.imgCard}>
                            <div className={styles.imgHeader}>
                              <svg className={styles.imgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                              <span className={styles.imgName}>{fname}</span>
                            </div>
                            <div className={styles.imgPreview}><img src={c.link} alt="Certificado"/></div>
                          </div>
                        )})()}
{!hasImgFile && !hasPdfFile && isPdfLink && (()=>{ const fname = nameFromUrl(c.link); return (
                            <div className={styles.pdfCard}>
                              <div className={styles.pdfHeader}>
                                <svg className={styles.pdfIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10v10H7z"/></svg>
                                <span className={styles.pdfName}>{fname}</span>
                              </div>
                              <PdfThumb src={c.link} fileName={fname} height={104} />
                            </div>
                          ); })()}
                        </div>
                      )}
                      <div className={styles.cardBody}>
                        <h4 className={styles.cardTitle}>{c.name || 'Certificado'}</h4>
                        {(c.issuer || c.year) && (
                          <p className={styles.cardText}>{[c.issuer, c.year].filter(Boolean).join(' • ')}</p>
                        )}
                        {c.link && (
                          <div className={styles.cardLinks}>
                            <a href={c.link} target="_blank" rel="noreferrer"><svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 1 0 7.07 7.07l1.71-1.71"/></svg>Ver</a>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className={styles.moreWrap}>
                {certificates.length > 5 && !expanded.cert && (
                  <button type="button" className={styles.moreBtn} onClick={()=>setExpanded(e=>({...e, cert:true}))}>Ver mais…</button>
                )}
                {expanded.cert && (
                  <button type="button" className={styles.moreBtn} onClick={()=>setExpanded(e=>({...e, cert:false}))}>Ocultar</button>
                )}
              </div>
            </Section>
          )}
          {hasAny(diplomas) && (
            <Section title="Diplomas">
              <div className={styles.grid}>
                {(expanded.dip ? diplomas : diplomas.slice(0,5)).map((d, i) => {
                  const isImgLink = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(String(d.link||''));
                  const isPdfLink = /\.pdf($|\?)/i.test(String(d.link||''));
                  const hasImgFile = d.fileType === 'image' && d.fileUrl;
                  const hasPdfFile = d.fileType === 'pdf' && d.fileUrl;
                  return (
                    <article key={i} className={styles.card}>
                      {(hasImgFile || hasPdfFile || isImgLink || isPdfLink) && (
                        <div className={styles.cardMedia}>
{hasImgFile && (()=>{ const fname = d.fileName || nameFromUrl(d.fileUrl||d.link||''); return (
                          <div className={styles.imgCard}>
                            <div className={styles.imgHeader}>
                              <svg className={styles.imgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                              <span className={styles.imgName}>{fname}</span>
                            </div>
                            <div className={styles.imgPreview}><img src={d.fileUrl} alt="Diploma"/></div>
                          </div>
                        )})()}
{hasPdfFile && (()=>{ const fname = d.fileName || nameFromUrl(d.link||''); return (
                            <div className={styles.pdfCard}>
                              <div className={styles.pdfHeader}>
                                <svg className={styles.pdfIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10v10H7z"/></svg>
                                <span className={styles.pdfName}>{fname}</span>
                              </div>
                              <PdfThumb src={d.fileUrl} fileName={fname} height={104} />
                            </div>
                          ); })()}
{!hasImgFile && !hasPdfFile && isImgLink && (()=>{ const fname = nameFromUrl(d.link); return (
                          <div className={styles.imgCard}>
                            <div className={styles.imgHeader}>
                              <svg className={styles.imgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                              <span className={styles.imgName}>{fname}</span>
                            </div>
                            <div className={styles.imgPreview}><img src={d.link} alt="Diploma"/></div>
                          </div>
                        )})()}
{!hasImgFile && !hasPdfFile && isPdfLink && (()=>{ const fname = nameFromUrl(d.link); return (
                            <div className={styles.pdfCard}>
                              <div className={styles.pdfHeader}>
                                <svg className={styles.pdfIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10v10H7z"/></svg>
                                <span className={styles.pdfName}>{fname}</span>
                              </div>
                              <PdfThumb src={d.link} fileName={fname} height={104} />
                            </div>
                          ); })()}
                        </div>
                      )}
                      <div className={styles.cardBody}>
                        <h4 className={styles.cardTitle}>{d.degree || 'Diploma'}</h4>
                        {(d.school || d.year) && (
                          <p className={styles.cardText}>{[d.school, d.year].filter(Boolean).join(' • ')}</p>
                        )}
                        {d.link && (
                          <div className={styles.cardLinks}>
                            <a href={d.link} target="_blank" rel="noreferrer"><svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 1 0 7.07 7.07l1.71-1.71"/></svg>Ver</a>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className={styles.moreWrap}>
                {diplomas.length > 5 && !expanded.dip && (
                  <button type="button" className={styles.moreBtn} onClick={()=>setExpanded(e=>({...e, dip:true}))}>Ver mais…</button>
                )}
                {expanded.dip && (
                  <button type="button" className={styles.moreBtn} onClick={()=>setExpanded(e=>({...e, dip:false}))}>Ocultar</button>
                )}
              </div>
            </Section>
          )}
        </div>
      )}

      {/* Languages */}
      {hasAny(languages) && (
        <Section title="Línguas">
          <div className={styles.langGrid}>
            {languages.map((l, i) => (
              <div key={i} className={styles.langPill}>
                <span className={styles.langName}>{l.language || '—'}</span>
                {l.fluency && <span className={styles.langDot} />}
                {l.fluency && <span className={styles.langLevel}>{l.fluency}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Links */}
      {hasAny(links) && (
        <Section title="Links">
          <ul className={styles.list}>
            {links.map((l, i) => {
              const isImg = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(String(l.url||''));
              const host = (() => { try { return new URL(l.url).hostname; } catch { return ''; } })();
              const fav = host ? `https://www.google.com/s2/favicons?sz=64&domain=${host}` : '';
              return (
                <li key={i} className={styles.linkRow}>
                  <div className={styles.linkCard}>
                    {isImg ? (
                      <img className={styles.linkThumbLg} src={l.url} alt="thumb" />
                    ) : (
                      <img className={styles.favicon} src={fav} alt="" />
                    )}
                    <a href={l.url} target="_blank" rel="noreferrer" className={styles.linkAnchor}>{l.label || host || l.url}</a>
                  </div>
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
            {(expanded.med ? media : media.slice(0,5)).map((m, i) => (
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

