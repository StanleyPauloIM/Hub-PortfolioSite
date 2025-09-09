// Reusable square swatch color picker (dropdown panel)
import React, { useEffect, useRef, useState } from 'react';
import styles from './ColorSwatches.module.css';

const DEFAULT_PALETTE = [
  // Reds / Pinks
  '#ff4d4f','#f5222d','#cf1322','#fa8072','#ff69b4','#d63384',
  // Purples / Violets
  '#9254de','#722ed1','#531dab','#7b68ee','#6a5acd','#8a2be2',
  // Blues / Cyans
  '#40a9ff','#1890ff','#096dd9','#1e90ff','#00b4d8','#00a2ff',
  // Teals / Greens
  '#13c2c2','#87e8de','#52c41a','#389e0d','#2ecc71','#16a34a',
  // Yellows / Oranges
  '#fadb14','#f59e0b','#fa8c16','#ff7a45','#ff6a00','#ffb703',
  // Grays / Neutrals
  '#ffffff','#e5e7eb','#cbd5e1','#94a3b8','#64748b','#334155',
  // Dark
  '#0b0b0b','#111827','#0a0a0a','#000000'
];

export default function ColorSwatches({ label, value, onChange, palette = DEFAULT_PALETTE }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const isSelected = (c) => String(c).toLowerCase() === String(value || '').toLowerCase();

  useEffect(() => {
    const onDocDown = (e) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  return (
    <div className={styles.wrap} ref={boxRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
      >
        {label && <span className={styles.triggerLabel}>{label}</span>}
        <span className={styles.chip} style={{ backgroundColor: value || '#000000' }} />
        <span className={styles.hex}>{value}</span>
        <span className={styles.caret}>▾</span>
      </button>

      {open && (
        <div className={styles.panel} role="listbox">
          <div className={styles.grid}>
            {palette.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                className={[styles.swatch, isSelected(c) ? styles.selected : ''].join(' ')}
                style={{ backgroundColor: c }}
                onClick={() => { onChange && onChange(c); setOpen(false); }}
                aria-pressed={isSelected(c)}
                aria-label={`Selecionar cor ${c}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

