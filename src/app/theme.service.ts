import { Injectable } from '@angular/core';
import { Theme,dark,light } from './theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = light;

  constructor() { }

  getActiveTheme(): Theme {
    return this.active;
  }
  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }
  setLightTheme(): void {
    this.setActiveTheme(light);
  }
  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}