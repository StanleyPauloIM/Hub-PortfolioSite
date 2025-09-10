// Reusable styled file input
import React, { useRef, useState } from 'react';
import styles from './FileInput.module.css';

export default function FileInput({
  accept = '*/*',
  onChange,
  label = 'Escolher ficheiro',
  hint = '',
  disabled = false,
  className = '',
  clearable = true,
}) {
  const inputRef = useRef(null);
  const [name, setName] = useState('Nenhum ficheiro');

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const onInput = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setName('Nenhum ficheiro');
      onChange && onChange(null);
      return;
    }
    setName(file.name);
    onChange && onChange(file);
  };

  const onClear = (e) => {
    e.stopPropagation();
    if (!inputRef.current) return;
    inputRef.current.value = '';
    setName('Nenhum ficheiro');
    onChange && onChange(null);
  };

  return (
    <div className={[styles.wrap, className].join(' ')}>
      <input
        ref={inputRef}
        type="file"
        className={styles.input}
        accept={accept}
        onChange={onInput}
        disabled={disabled}
        aria-hidden
      />
      <button type="button" className={styles.button} onClick={openPicker} disabled={disabled}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/><path d="M12 12v9"/><path d="M7 7l5-5 5 5"/></svg>
        <span>{label}</span>
      </button>
      <div className={styles.meta} title={name}>
        <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
        <span className={styles.name}>{name}</span>
        {clearable && name !== 'Nenhum ficheiro' && (
          <button type="button" className={styles.clearBtn} onClick={onClear} aria-label="Limpar ficheiro">×</button>
        )}
      </div>
      {hint && <small className={styles.hint}>{hint}</small>}
    </div>
  );
}

