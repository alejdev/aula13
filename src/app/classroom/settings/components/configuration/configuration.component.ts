import { Subscription } from 'rxjs'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { LanguageService } from 'src/app/classroom/services/language.service'
import { INPUT_APPEARANCE } from 'src/app/core/core.module'
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

  title: string = 'SETTINGS'
  langControl = new FormControl('', [])
  languages: any
  themeControl: any
  inputAppearance: boolean
  themeIsDark: boolean
  canSlideSideMenu: boolean = this.settingService.value.canSlideSideMenu
  canSlideRoutes: boolean = this.settingService.value.canSlideRoutes
  inputAppearances = INPUT_APPEARANCE
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
    this.langSubscription = this.languageService.lang.subscribe((result: any) => {
      this.langControl.setValue(result)
    })

    // Get input appearance
    this.inputAppearance = this.settingService.value.inputAppearance
    this.inputAppearanceIcon = this.getInputAppearanceIcon()

    // Get theme
    this.themeSubscription = this.themeService.theme.subscribe((result: any) => {
      this.themeControl = result
      this.themeIsDark = result.isDark
    })
  }

  setLang(): void {
    this.languageService.setLang(this.langControl.value)
  }

  getFlag(lang: any): string {
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
    const inputIcon = this.inputAppearances.find((input) => input.id === this.settingService.value.inputAppearance)
    return inputIcon ? inputIcon.icon : 'fill'
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
