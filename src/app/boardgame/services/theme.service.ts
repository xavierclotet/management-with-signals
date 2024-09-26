// theme.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private theme = signal<'light' | 'dark'>('light');

  constructor() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      this.theme.set(savedTheme);
    } else {
      this.theme.set(this.detectColorScheme());
    }
    this.applyTheme();
  }

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    localStorage.setItem('theme', newTheme);
    this.applyTheme();
  }

  private applyTheme() {
    this.document.body.setAttribute('data-theme', this.theme());
  }

  getCurrentTheme() {
    return this.theme();
  }

  private detectColorScheme(): 'light' | 'dark' {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
}
