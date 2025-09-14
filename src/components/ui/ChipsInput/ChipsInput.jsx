// LinkedIn-like chips input with suggestions
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ChipsInput.module.css';

export default function ChipsInput({ value = [], onChange, placeholder = 'Adicionar skill…', suggestions = [], max = 50, minInputWidth = 240 }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const valSet = useMemo(() => new Set(value.map(v => v.toLowerCase())), [value]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = suggestions.filter(s => !valSet.has(s.toLowerCase()));
    if (!q) return list.slice(0, 8);
    return list.filter(s => s.toLowerCase().includes(q)).slice(0, 8);
  }, [query, suggestions, valSet]);

  useEffect(() => {
    const onDocDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  const commit = (text) => {
    const raw = String(text || '').trim().replace(/\s+/g, ' ');
    if (!raw) return;
    if (value.length >= max) return;
    if (valSet.has(raw.toLowerCase())) return;
    const clean = raw.slice(0, 40); // limit size per skill
    onChange && onChange([...value, clean]);
    setQuery('');
    setActive(0);
    setOpen(false);
  };

  const remove = (idx) => {
    const next = value.filter((_, i) => i !== idx);
    onChange && onChange(next);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (open && filtered[active]) return commit(filtered[active]);
      return commit(query);
    }
    if (e.key === 'Backspace' && !query && value.length) {
      e.preventDefault();
      remove(value.length - 1);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className={styles.wrap} ref={wrapRef} onClick={() => inputRef.current?.focus()}>
      <div className={styles.chipsRow}>
        {value.map((s, i) => (
          <span key={s + i} className={styles.chip}>
            #{s}
            <button type="button" className={styles.close} onClick={() => remove(i)} aria-label={`Remover ${s}`}>×</button>
          </span>
        ))}
        <input
          ref={inputRef}
          className={styles.input}
          style={{ minWidth: Math.max(160, Number(minInputWidth)||240) }}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-expanded={open}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className={styles.panel} role="listbox">
          {filtered.map((s, i) => (
            <button
              key={s}
              type="button"
              className={[styles.option, i === active ? styles.active : ''].join(' ')}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(s)}
              role="option"
              aria-selected={i === active}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

