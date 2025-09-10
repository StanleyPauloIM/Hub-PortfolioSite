// PdfThumb: renders first page of a PDF into a canvas, no scroll, like a thumbnail
import React, { useEffect, useRef, useState } from 'react';
import styles from './PdfThumb.module.css';

let _pdfPromise;
async function loadPdfJs() {
  if (_pdfPromise) return _pdfPromise;
  _pdfPromise = (async () => {
    try {
      const mod = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.10.111/build/pdf.min.mjs');
      return { getDocument: mod.getDocument };
    } catch {
      // Fallback: load UMD build onto window
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.10.111/build/pdf.min.js';
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Falha ao carregar pdf.js'));
        document.head.appendChild(s);
      });
      // @ts-ignore
      const lib = window['pdfjsLib'];
      if (!lib) throw new Error('pdfjs indisponível');
      return { getDocument: lib.getDocument };
    }
  })();
  return _pdfPromise;
}

export default function PdfThumb({ src, fileName = 'PDF', height = 140 }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setError(null);
      try {
        // Dynamic import from CDN to avoid bundling dependency
        // eslint-disable-next-line import/no-dynamic-require
        const pdfjsLib = await loadPdfJs();
        const loadingTask = pdfjsLib.getDocument({ url: src, disableWorker: true });
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        const page = await pdf.getPage(1);
const targetHeight = Number(height) || 140; // px
        const viewport0 = page.getViewport({ scale: 1 });
        const dpr = (window.devicePixelRatio || 1);
        const scale = (targetHeight * dpr) / viewport0.height;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d', { alpha: false });
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));
        const renderContext = { canvasContext: context, viewport };
        await page.render(renderContext).promise;
      } catch (e) {
        if (!cancelled) setError(e.message || 'Falha ao carregar PDF');
      }
    }
    if (src) run();
    return () => { cancelled = true; };
  }, [src]);

  if (error) {
    return (
      <div className={styles.fallback} style={{ height }}>📄 {fileName}</div>
    );
  }

  return (
    <div className={styles.wrap} style={{ height }}>
      <canvas ref={canvasRef} className={styles.canvas} aria-label={`Pré-visualização de ${fileName}`} />
    </div>
  );
}

