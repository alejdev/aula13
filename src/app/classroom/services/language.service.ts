import { Injectable } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

import { SettingService } from '../../shared/services/setting.service'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public lang: BehaviorSubject<any>
  private languageList: any = [{
    id: 'es',
    name: 'LANG.ES',
    tip: '“La razón de la sinrazón, que a mi razón se hace, de tal manera mi razón enflaquece, que con razón me quejo de la vuestra fermosura”.'
  }, {
    id: 'en',
    name: 'LANG.EN',
    tip: '“A wizard is never late, nor is he early, he arrives precisely when he means to!”'
  }]

  constructor(
    private settingsService: SettingService,
    private translateService: TranslateService
  ) {
    const language = this.languages.find((lang: any) => lang.id === this.settingsService.value.lang)
    this.lang = new BehaviorSubject(language)
  }

  public setLang(value: any) {
    this.settingsService.value = { lang: value.id }
    this.lang.next(value)
    this.translateService.use(value.id)
  }

  public get languages(): any {
    return this.languageList
  }
}