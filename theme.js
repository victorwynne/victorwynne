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
            }
        });
    }

    applyTheme() {
        const root = document.documentElement;
        root.removeAttribute('data-theme');
        root.style.colorScheme = '';
        
        if (this.theme === 'auto') {
        } else {
            root.setAttribute('data-theme', this.theme);
            this.forceTheme();
        }
        
        localStorage.setItem(this.storageKey, this.theme);
    }

    forceTheme() {
        const root = document.documentElement;
        root.style.colorScheme = this.theme;
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