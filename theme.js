class ThemeToggle {
    constructor() {
        this.storageKey = 'theme-preference';
        this.theme = this.getTheme();
        this.init();
    }

    getTheme() {
        if (localStorage.getItem(this.storageKey)) {
            return localStorage.getItem(this.storageKey);
        }
        return 'auto';
    }

    init() {
        this.applyTheme();
        
        const toggleButton = document.querySelector('[data-theme-toggle]');
        if (toggleButton) {
            this.updateToggleButton(toggleButton);
            toggleButton.addEventListener('click', () => this.toggleTheme());
        }

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
            if (this.theme === 'auto') {
                this.applyTheme();
            }
        });
    }

    applyTheme() {
        const root = document.documentElement;
        
        root.removeAttribute('data-forced-theme');
        
        if (this.theme !== 'auto') {

            root.setAttribute('data-forced-theme', this.theme);

            this.injectThemeOverride();
        } else {
            this.removeThemeOverride();
        }

        localStorage.setItem(this.storageKey, this.theme);
    }

    injectThemeOverride() {
        this.removeThemeOverride();
        
        const style = document.createElement('style');
        style.id = 'theme-override';
        
        if (this.theme === 'light') {
            style.textContent = `
                html[data-forced-theme="light"] { color-scheme: light !important; }
                @media (prefers-color-scheme: dark) {
                    html[data-forced-theme="light"] { color-scheme: light !important; }
                }
            `;
        } else if (this.theme === 'dark') {
            style.textContent = `
                html[data-forced-theme="dark"] { color-scheme: dark !important; }
                @media (prefers-color-scheme: light) {
                    html[data-forced-theme="dark"] { color-scheme: dark !important; }
                }
            `;
        }
        
        document.head.appendChild(style);
    }

    removeThemeOverride() {
        const existingStyle = document.getElementById('theme-override');
        if (existingStyle) {
            existingStyle.remove();
        }
    }

    toggleTheme() {
        switch (this.theme) {
            case 'auto':
                this.theme = 'light';
                break;
            case 'light':
                this.theme = 'dark';
                break;
            case 'dark':
                this.theme = 'auto';
                break;
        }
        
        this.applyTheme();

        const toggleButton = document.querySelector('[data-theme-toggle]');
        if (toggleButton) {
            this.updateToggleButton(toggleButton);
        }
    }

    updateToggleButton(button) {

        const labels = {
            'auto': '🌓 Auto',
            'light': '☀️ Light',
            'dark': '🌙 Dark'
        };
        
        button.textContent = labels[this.theme];
        button.setAttribute('aria-label', `Current theme: ${this.theme}. Click to cycle themes.`);
    }

    getCurrentEffectiveTheme() {

        if (this.theme === 'auto') {
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        return this.theme;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});