import { BehaviorSubject } from 'rxjs'
import { LanguageElement } from 'src/app/core/interfaces'
import { LANGUAGE_LIST } from 'src/app/core/settings'

import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { SettingService } from '../../shared/services/setting.service'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public lang: BehaviorSubject<LanguageElement>
  private languageList: LanguageElement[] = LANGUAGE_LIST

  constructor(
    private settingsService: SettingService,
    private translateService: TranslateService
  ) {
    const language = this.languages.find((lang: LanguageElement) => lang.id === this.settingsService.value.lang)
    this.lang = new BehaviorSubject(language)
  }

  public setLang(language: LanguageElement) {
    this.settingsService.value = { lang: language.id }
    this.lang.next(language)
    this.translateService.use(language.id)
  }

  public get languages(): LanguageElement[] {
    return this.languageList
  }
}
