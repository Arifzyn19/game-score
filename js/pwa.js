/* PWA: register the service worker (best-effort; unsupported hosts are ignored). */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}