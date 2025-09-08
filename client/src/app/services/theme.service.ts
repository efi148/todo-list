import { effect, signal } from '@angular/core';
import { ThemeMode } from "@interfaces";

export class ThemeService {
    themeMode = signal<ThemeMode>('system');

    constructor() {
        const savedTheme = localStorage.getItem('theme') as ThemeMode;
        if (savedTheme) {
            this.themeMode.set(savedTheme);
        }

        effect(() => {
            this.applyTheme(this.themeMode());
        });
    }

    toggleTheme(): void {
        const nextTheme = {
            system: 'light',
            light: 'dark',
            dark: 'system'
        }[this.themeMode() as ThemeMode] as ThemeMode;

        this.themeMode.set(nextTheme);
        localStorage.setItem('theme', nextTheme);
    }

    private applyTheme(theme: ThemeMode) {
        const body = document.body;
        body.classList.remove('light-theme', 'dark-theme');

        switch (theme) {
            case 'light':
                body.classList.add('light-theme');
                break;
            case 'dark':
                body.classList.add('dark-theme');
                break;
            case 'system':
                break;
        }
    }
}
