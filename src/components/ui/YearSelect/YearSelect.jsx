// Simple YearSelect dropdown component
import React from 'react';
import styles from './YearSelect.module.css';

export default function YearSelect({ value, onChange, start = 1970, end = new Date().getFullYear() + 5, placeholder = 'Ano' }) {
  const options = [];
  for (let y = end; y >= start; y--) options.push(y);
  return (
    <div className={styles.wrap}>
      <select
        className={styles.select}
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

