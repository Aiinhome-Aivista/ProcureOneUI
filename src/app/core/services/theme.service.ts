import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'procure-one-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  
  // Signals
  readonly themePreference = signal<Theme>(this.getStoredTheme());
  readonly systemTheme = signal<'light' | 'dark'>(this.detectSystemTheme());
  readonly activeTheme = signal<'light' | 'dark'>('light');

  constructor() {
    // Initialize active theme
    this.updateActiveTheme();
    
    // Listen to system theme changes
    this.initSystemThemeListener();
    
    // Apply theme when it changes
    effect(() => {
      const theme = this.activeTheme();
      this.applyTheme(theme);
    });
  }

  /**
   * Set theme preference (light, dark, or system)
   */
  setTheme(theme: Theme): void {
    this.themePreference.set(theme);
    this.saveTheme(theme);
    this.updateActiveTheme();
  }

  /**
   * Toggle between light and dark themes
   */
  toggle(): void {
    const current = this.activeTheme();
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Get stored theme from localStorage
   */
  private getStoredTheme(): Theme {
    if (typeof window === 'undefined') {
      return 'system';
    }
    
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    
    return 'system';
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  /**
   * Detect system color scheme preference
   */
  private detectSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') {
      return 'light';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Initialize system theme change listener
   */
  private initSystemThemeListener(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const listener = (e: MediaQueryListEvent) => {
      this.systemTheme.set(e.matches ? 'dark' : 'light');
      
      // Update active theme if using system preference
      if (this.themePreference() === 'system') {
        this.updateActiveTheme();
      }
    };

    mediaQuery.addEventListener('change', listener);
    
    this.destroyRef.onDestroy(() => {
      mediaQuery.removeEventListener('change', listener);
    });
  }

  /**
   * Update active theme based on preference
   */
  private updateActiveTheme(): void {
    const preference = this.themePreference();
    
    if (preference === 'system') {
      this.activeTheme.set(this.systemTheme());
    } else {
      this.activeTheme.set(preference);
    }
  }

  /**
   * Apply theme to document - Simply toggles .dark class
   * All styling is handled by CSS variables in styles.css
   */
  private applyTheme(theme: 'light' | 'dark'): void {
    const html = this.document.documentElement;

    if (!html) {
      return;
    }

    // Toggle dark class - CSS variables handle the rest
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Set data attribute for additional styling hooks if needed
    html.setAttribute('data-theme', theme);

    // Update theme-color meta tag
    this.updateThemeColorMeta(theme);
  }

  /**
   * Update theme-color meta tag
   */
  private updateThemeColorMeta(theme: 'light' | 'dark'): void {
    const head = this.document.head;
    if (!head) {
      return;
    }

    let metaTheme = head.querySelector('meta[name="theme-color"]');
    
    if (!metaTheme) {
      metaTheme = this.document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      head.appendChild(metaTheme);
    }

    // Use CSS variable values
    const color = theme === 'dark' ? '#0f172a' : '#ffffff';
    metaTheme.setAttribute('content', color);
  }
}
