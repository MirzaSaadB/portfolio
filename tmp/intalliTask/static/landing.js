document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher-landing');
    const currentTheme = localStorage.getItem('theme') || 'light';

    const setTheme = (theme) => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        localStorage.setItem('theme', theme);
        themeSwitcher.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    };

    themeSwitcher.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(newTheme);
    });

    setTheme(currentTheme);
});