import { Subscription } from 'rxjs'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { LanguageService } from 'src/app/classroom/services/language.service'
import { InputAppearance, InputAppearanceElement, LanguageElement, ThemeElement } from 'src/app/core/interfaces'
import { INPUT_APPEARANCE } from 'src/app/core/settings'
import { SettingService } from 'src/app/shared/services/setting.service'
import { ThemeService } from 'src/app/shared/services/theme.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'a13-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  langControl = new FormControl('', [])
  languages: LanguageElement[]
  themeControl: any
  inputAppearance: InputAppearance
  themeIsDark: boolean
  canSlideSideMenu: boolean = this.settingService.value.canSlideSideMenu
  canSlideRoutes: boolean = this.settingService.value.canSlideRoutes
  inputAppearances: InputAppearanceElement[] = INPUT_APPEARANCE
  inputAppearanceIcon: string

  langSubscription: Subscription
  themeSubscription: Subscription

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private settingService: SettingService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {

    // Config header
    this.headerService.configHeader({ title: 'SETTINGS', showLogo: true, showProfile: true })

    // Language list
    this.languages = this.languageService.languages

    // Get language
    this.langSubscription = this.languageService.lang.subscribe((language: LanguageElement) => {
      this.langControl.setValue(language)
    })

    // Get input appearance
    this.inputAppearance = this.settingService.value.inputAppearance
    this.inputAppearanceIcon = this.getInputAppearanceIcon()

    // Get theme
    this.themeSubscription = this.themeService.theme.subscribe((theme: ThemeElement) => {
      this.themeControl = theme
      this.themeIsDark = theme.isDark
    })
  }

  setLang(): void {
    this.languageService.setLang(this.langControl.value)
  }

  getFlag(lang: LanguageElement): string {
    return `/assets/svgs/flags/${lang.id}.svg`
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

  setInputAppearance(): void {
    this.settingService.value = { inputAppearance: this.inputAppearance }
    this.inputAppearanceIcon = this.getInputAppearanceIcon()
  }

  getInputAppearanceIcon(): string {
    const inputIcon = this.inputAppearances.find((input: InputAppearanceElement) => input.id === this.settingService.value.inputAppearance)
    return inputIcon ? inputIcon.icon : InputAppearance.fill
  }

  toggleSlideSideMenu(): void {
    this.settingService.value = { canSlideSideMenu: !this.settingService.value.canSlideSideMenu }
  }

  toggleSlideRoutes(): void {
    this.settingService.value = { canSlideRoutes: !this.settingService.value.canSlideRoutes }
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe()
    this.themeSubscription.unsubscribe()
  }
}
