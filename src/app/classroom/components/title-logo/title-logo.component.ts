import { Instrument, LogoConfig } from 'src/app/core/interfaces'
import { EMOJIS, INSTRUMENT_LIST } from 'src/app/core/settings'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { MatTooltip } from '@angular/material'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'a13-title-logo',
  templateUrl: './title-logo.component.html',
  styleUrls: ['./title-logo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TitleLogoComponent implements OnInit {

  @Input() config: LogoConfig
  instruments: any = INSTRUMENT_LIST
    .reduce((acc, current) => acc = acc.concat(current.group), [])
    .map((instrument: Instrument) => instrument.viewValue)

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
    const instrument = UtilService.getRandomElement(this.instruments)
    const emoji = UtilService.getRandomElement(EMOJIS)

    const translateMessage = this.translateService.instant(`GRETTING.MSG_${UtilService.rand(10, 1)}`)
    const translateInstrument = this.translateService.instant(`INSTRUMENT.${instrument}`).toLowerCase()

    return `${translateMessage} ${translateInstrument} ${emoji}`
  }
}
