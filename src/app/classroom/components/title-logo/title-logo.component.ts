import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { MatTooltip } from '@angular/material'
import { TranslateService } from '@ngx-translate/core'

export interface LogoConfig {
  showLogo?: boolean
  showTitle?: boolean
  showTagline?: boolean
  imageInvertedIfDarkTheme?: boolean
  shake?: boolean
  color?: string // blue|black|transparent
  size?: string
}

@Component({
  selector: 'a13-title-logo',
  templateUrl: './title-logo.component.html',
  styleUrls: ['./title-logo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TitleLogoComponent implements OnInit {

  @Input() config: LogoConfig
  instruments: any = ModelService.instrumentList
    .reduce((acc, current) => acc = acc.concat(current.group), [])
    .map((instrument) => instrument.viewValue)

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit(): void { }

  toggleTooltip(tooltip: MatTooltip): void {
    if (tooltip._isTooltipVisible()) {
      tooltip.hide()
    } else {
      tooltip.message = this.getTooltipMessage()
      tooltip.show()
    }
  }

  getTooltipMessage(): string {
    const message = UtilService.getRandomElement(ModelService.grettings)
    const instrument = UtilService.getRandomElement(this.instruments)
    const emoji = UtilService.getRandomElement(ModelService.emojis)

    const translateMessage = this.translateService.instant(`GRETTING.${message}`)
    const translateInstrument = this.translateService.instant(`INSTRUMENT.${instrument}`).toLowerCase()

    return `${translateMessage} ${translateInstrument} ${emoji}`
  }
}
