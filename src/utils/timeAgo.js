export function timeAgoShort(input) {
  try {
    const t = typeof input === 'number' ? input : new Date(input).getTime();
    const now = Date.now();
    let s = Math.max(0, Math.floor((now - t) / 1000));
    const year = 365 * 24 * 3600;
    const month = 30 * 24 * 3600;
    const week = 7 * 24 * 3600;
    const hour = 3600;
    const min = 60;

    if (s >= year) return Math.floor(s / year) + 'y';
    if (s >= month) return Math.floor(s / month) + 'm'; // month
    if (s >= week) return Math.floor(s / week) + 'w';
    if (s >= hour) return Math.floor(s / hour) + 'h';
    if (s >= min) return Math.floor(s / min) + 'min';
    return Math.floor(s) + 'sec';
  } catch {
    return '0sec';
  }
}

