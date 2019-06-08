import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { SettingService } from './setting.service'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public theme: BehaviorSubject<any>
  public previousTheme: any
  private themeList: any = [{
    id: 'light-theme',
    name: 'THEMING.LIGHT_THEME',
    icon: 'brightness_5',
    isDark: false
  }, {
    id: 'dark-theme',
    name: 'THEMING.DARK_THEME',
    icon: 'brightness_3',
    isDark: true
  }]

  constructor(private settingsService: SettingService) {
    this.theme = new BehaviorSubject(this.themeList[this.settingsService.value.theme])
  }

  public toggleTheme(): void {
    const currentThemeIndex = this.settingsService.value.theme
    this.previousTheme = this.themeList[currentThemeIndex]
    if (currentThemeIndex === this.themeList.length - 1) {
      this.settingsService.value = { theme: 0 }
      this.theme.next(this.themeList[this.settingsService.value.theme])
    } else {
      this.settingsService.value = { theme: currentThemeIndex + 1 }
      this.theme.next(this.themeList[this.settingsService.value.theme])
    }
  }
}
