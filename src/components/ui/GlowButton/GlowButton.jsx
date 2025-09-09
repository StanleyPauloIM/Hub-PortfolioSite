import React from 'react';
import styles from './GlowButton.module.css';

/**
 * Universal glow/gradient button.
 * - Not used automatically anywhere. Import and use when desired.
 * - Works as <button> or <a> via the `as` prop.
 *
 * Usage examples:
 *   <GlowButton onClick={...}>Action</GlowButton>
 *   <GlowButton as="a" href="/path">Go</GlowButton>
 */
export default function GlowButton({ as = 'button', children, className = '', ...rest }) {
  const classes = [styles.glowBtn, className].filter(Boolean).join(' ');

  if (as === 'a') {
    const { href, ...other } = rest;
    return (
      <a href={href} className={classes} {...other}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

