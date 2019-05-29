import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { LanguageService } from 'src/app/services/language.service'
import { ThemeService } from 'src/app/services/theme.service'

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

  constructor(private languageService: LanguageService, private themeService: ThemeService) {
    this.languages = languageService.languages
  }

  ngOnInit(): void {
    this.languageService.lang.subscribe((result: any) => {
      this.langControl.setValue(result)
    })
    this.themeService.theme.subscribe((result: any) => {
      this.themeControl = result
      this.themeIsDark = result.isDark
    })
  }

  setLang(): void {
    this.languageService.setLang(this.langControl.value)
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }
}
