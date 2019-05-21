import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private defaultThemeIndex: number = 0
  private themeList: any = [{
    id: 'light-theme',
    name: 'modo luz',
    icon: 'brightness_5',
    isDark: false
  }, {
    id: 'dark-theme',
    name: 'modo oscuro',
    icon: 'brightness_3',
    isDark: true
  }]
  public theme: BehaviorSubject<any> = new BehaviorSubject(this.themeList[this.defaultThemeIndex])

  constructor() { }

  getNextTheme(currentTheme: any): any {
    let currentThemeIndex = this.themeList.indexOf(currentTheme);
    switch (true) {
      case currentThemeIndex === -1:
        return this.themeList[this.defaultThemeIndex]
      case currentThemeIndex === this.themeList.length - 1:
        return this.themeList[0]
      default:
        return this.themeList[currentThemeIndex + 1]
    }
  }

}
