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
    tip: '“El lago parece mar, el viento sirve de abrigo: todo se vuelve a inventar si lo comparto contigo.” —Silvio Rodriguez'
  }, {
    id: 'en',
    name: 'LANG.EN',
    tip: '“Work is life, you know, and without it, there’s nothing but fear and insecurity.” —John Lennon'
  }, {
    id: 'de',
    name: 'LANG.DE',
    tip: '“Alles, was man tun muss, ist, die richtige Taste zum richtigen Zeitpunkt zu treffen und das Instrument spielt von ganz allein.” —Johann Sebastian Bach'}, {
    id: 'it',
    name: 'LANG.IT',
    tip: '“Non ci si improvvisa. Per diventare grandi serve molta esperienza alle spalle, dalla serata allo spettacolo, dalla piccola televisione alla radio.” —Raffaella Carrà'
  }, {
    id: 'fr',
    name: 'LANG.FR',
    tip: '“J\'aime la vie profondément, j\'aime l\'humain. Je sais qu\'il est capable des pires choses comme des plus belles choses. J\'ai envie de valoriser les belles choses.” —Isabelle Geffroy (Zaz)'
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
