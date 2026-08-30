(function(){
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const THEME_KEY = 'hsc-theme';

  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    if (saved === 'dark') {
      html.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
    } else {
      html.classList.remove('dark-mode');
      themeToggle.textContent = '🌙';
    }
  }

  function toggleTheme() {
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      localStorage.setItem(THEME_KEY, 'light');
      themeToggle.textContent = '🌙';
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem(THEME_KEY, 'dark');
      themeToggle.textContent = '☀️';
    }
  }

  themeToggle.onclick = toggleTheme;
  loadTheme();
})();
