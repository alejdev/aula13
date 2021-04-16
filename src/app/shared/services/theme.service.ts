import { BehaviorSubject } from 'rxjs'
import { Theme, ThemeElement } from 'src/app/core/interfaces'
import { THEME_LIST } from 'src/app/core/settings'

import { OverlayContainer } from '@angular/cdk/overlay'
import { Injectable } from '@angular/core'

import { SettingService } from './setting.service'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public theme: BehaviorSubject<ThemeElement>
  private themeList: ThemeElement[] = THEME_LIST

  constructor(
    private settingsService: SettingService,
    private overlayContainer: OverlayContainer
  ) {
    this.setTheme(this.settingsService.value.theme)
  }

  public getThemeByIndex(index: number): any {
    return this.themeList[index]
  }

  public setTheme(themeIndex: number): void {
    if (this.theme) {
      this.theme.next(this.themeList[themeIndex])
    } else {
      this.theme = new BehaviorSubject(this.themeList[themeIndex])
    }
    this.setOverlay(this.themeList[themeIndex].id)
  }

  public toggleTheme(): void {
    const currentThemeIndex = this.settingsService.value.theme

    if (currentThemeIndex === this.themeList.length - 1) {
      this.settingsService.value = { theme: 0 }
    } else {
      this.settingsService.value = { theme: currentThemeIndex + 1 }
    }

    this.theme.next(this.themeList[this.settingsService.value.theme])

    // Set overlay
    this.setOverlay(this.themeList[this.settingsService.value.theme].id)
  }

  private setOverlay(theme: Theme): void {
    const overlayClasses = this.overlayContainer.getContainerElement().classList
    const themeClassesToRemove = Array.from(overlayClasses).filter((item: string) => item.includes('-theme'))
    if (themeClassesToRemove.length) {
      overlayClasses.remove(...themeClassesToRemove)
    }
    overlayClasses.add(theme)
  }
}
