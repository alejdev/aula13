import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

import { LanguageService } from 'src/app/classroom/services/language.service'
import { ThemeService } from 'src/app/shared/services/theme.service'

@Component({
  selector: 'a13-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  title: string = 'SETTINGS'
  langControl = new FormControl('', [])
  languages: any
  themeControl: any
  themeIsDark: boolean

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    // Language list
    this.languages = this.languageService.languages

    // Get language
    this.languageService.lang.subscribe((result: any) => {
      this.langControl.setValue(result)
    })

    // Get theme
    this.themeService.theme.subscribe((result: any) => {
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
}
