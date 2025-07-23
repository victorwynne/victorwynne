if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    alert('Starting SW registration...');
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        alert('SW registered successfully!');
      })
      .catch(err => {
        alert('SW failed: ' + err.message);
      });
  });
}