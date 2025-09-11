// Reutilizable AutocompleteSelect: input + dropdown com pesquisa e scroll
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './AutocompleteSelect.module.css';

export default function AutocompleteSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Selecionar…',
  allowCustom = true,
  maxVisible = 7,
  renderLeadingIcon,
  noMatchesText = 'Sem resultados',
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const dedup = Array.from(new Set(options.filter(Boolean)));
    const filtered = q ? dedup.filter(o => String(o).toLowerCase().includes(q)) : dedup;
    return filtered.slice(0, Math.max(maxVisible, 1));
  }, [options, query, maxVisible]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    setQuery(String(value || ''));
  }, [value]);

  const commit = (val) => {
    const v = String(val ?? '').trim();
    if (!v) return;
    onChange && onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (open && list[active]) return commit(list[active]);
      if (allowCustom) return commit(query);
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % Math.max(list.length, 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a - 1 + Math.max(list.length, 1)) % Math.max(list.length, 1));
      return;
    }
    if (e.key === 'Escape') setOpen(false);
  };

  const showNoMatch = open && list.length === 0 && query.trim().length > 0;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.inputWrap} onClick={() => inputRef.current?.focus()}>
        {renderLeadingIcon ? (
          <span className={styles.leading}>{renderLeadingIcon()}</span>
        ) : null}
        <input
          ref={inputRef}
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-expanded={open}
        />
      </div>
      {open && (
        <div className={styles.panel} role="listbox">
          {list.map((opt, i) => (
            <button
              key={opt + i}
              type="button"
              className={[styles.option, i === active ? styles.active : ''].join(' ')}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(opt)}
              role="option"
              aria-selected={i === active}
              title={String(opt)}
            >
              {opt}
            </button>
          ))}
          {showNoMatch && (
            <div className={styles.noMatch}>{noMatchesText}</div>
          )}
          {allowCustom && query.trim() && !list.includes(query.trim()) && (
            <button
              type="button"
              className={[styles.option, styles.create].join(' ')}
              onClick={() => commit(query)}
              title={`Usar \"${query.trim()}\"`}
            >
              + Usar "{query.trim()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}

