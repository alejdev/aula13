import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'

import { LanguageService } from 'src/app/classroom/services/language.service'
import { ThemeService } from 'src/app/shared/services/theme.service'
import { SettingService } from 'src/app/shared/services/setting.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { HeaderService } from 'src/app/classroom/services/header.service'

@Component({
  selector: 'a13-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  title: string = 'SETTINGS'
  langControl = new FormControl('', [])
  languages: any
  themeControl: any
  themeIsDark: boolean
  canPanSideMenu: boolean = this.settingService.value.canPanSideMenu

  langSubscription: Subscription
  themeSubscription: Subscription

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private settingService: SettingService,
    private toastService: ToastService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {

    // Config header
    this.headerService.configHeader({ title: 'SETTINGS' })

    // Language list
    this.languages = this.languageService.languages

    // Get language
    this.langSubscription = this.languageService.lang.subscribe((result: any) => {
      this.langControl.setValue(result)
    })

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

  togglePanSideMenu(): void {
    this.settingService.value = { canPanSideMenu: !this.settingService.value.canPanSideMenu }
    this.toastService.info('MSG.RELOAD_PAGE_FOR_CHANGES')
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe()
    this.themeSubscription.unsubscribe()
  }
}
