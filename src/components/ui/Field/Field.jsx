import React from 'react';
import styles from './Field.module.css';

export function Field({ icon, children, dropdown = false, className = '', noInnerFrame = false }) {
  return (
    <div className={[styles.wrap, dropdown ? styles.hasCaret : styles.noCaret, noInnerFrame ? 'noOuterField' : '', className].join(' ').trim()}>
      {icon ? <span className={styles.leading}>{icon}</span> : <span className={styles.leading} />}
      <div className={styles.body}>{children}</div>
      {dropdown ? (
        <span className={styles.caret} aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      ) : null}
    </div>
  );
}

export function FieldInput({ icon, dropdown = false, className = '', noInnerFrame = false, maxLength, ...inputProps }) {
  return (
    <Field icon={icon} dropdown={dropdown} className={className} noInnerFrame={noInnerFrame}>
      <input className={styles.input} maxLength={typeof maxLength === 'number' ? maxLength : undefined} {...inputProps} />
    </Field>
  );
}

export default Field;

