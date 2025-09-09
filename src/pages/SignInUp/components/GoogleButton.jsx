// Botão de login com Google (estilizado)
import React from 'react';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.648 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.642 6.053 29.083 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.651-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.642 6.053 29.083 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.799-1.977 13.285-5.197l-6.137-5.19C28.982 35.091 26.62 36 24 36c-5.204 0-9.623-3.327-11.285-7.973l-6.545 5.045C9.49 39.556 16.155 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.268 3.581-4.311 6.369-8.018 7.613l6.137 5.19C36.406 38.823 40 32.5 40 24c0-1.341-.138-2.651-.389-3.917z"/>
    </svg>
  );
}

export default function GoogleButton({ onClick, className = '' }) {
  return (
    <button type="button" onClick={onClick} className={`${className}`} aria-label="Continuar com Google">
      <GoogleIcon />
      <span style={{ marginLeft: 8 }}>Continuar com Google</span>
    </button>
  );
}
