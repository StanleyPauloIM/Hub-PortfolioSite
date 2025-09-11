import { useEffect } from 'react';

/**
 * Close things when clicking outside a referenced element.
 * Usage:
 *   const ref = useRef(null);
 *   useOnClickOutside(ref, () => setOpen(false), { enabled: open });
 */
export default function useOnClickOutside(ref, handler, options = {}) {
  const { enabled = true, events = ['mousedown', 'touchstart'] } = options;
  useEffect(() => {
    if (!enabled) return;
    const el = ref?.current;
    const listener = (e) => {
      // If ref isn't set or click is inside, ignore
      const node = el;
      if (!node || node.contains(e.target)) return;
      try { handler?.(e); } catch {}
    };
    events.forEach((evt) => document.addEventListener(evt, listener, { capture: true }));
    return () => { events.forEach((evt) => document.removeEventListener(evt, listener, { capture: true })); };
  }, [ref, handler, enabled]);
}

/**
 * Close on Escape key.
 */
export function useOnEscape(handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e) => { if (e.key === 'Escape') { try { handler?.(e); } catch {} } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handler, enabled]);
}

