/* Keep the game surface still, including on older mobile Safari. */
(() => {
  'use strict';
  const preventGesture = event => { if (event.cancelable) event.preventDefault(); };
  document.addEventListener('touchmove', preventGesture, { passive: false });
  document.addEventListener('gesturestart', preventGesture, { passive: false });
  document.addEventListener('gesturechange', preventGesture, { passive: false });
  document.addEventListener('dblclick', preventGesture, { passive: false });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // New versions wait for existing game windows to close; never reload a round.
      navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(error => {
        console.warn('Offline play is unavailable this time:', error);
      });
    });
  }
})();
