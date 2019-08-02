import { Component, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { OverlayContainer } from '@angular/cdk/overlay'

import { TranslateService } from '@ngx-translate/core'

import { SettingService } from './shared/services/setting.service'

@Component({
  selector: 'a13-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private settingsService: SettingService,
    private translateService: TranslateService,
    private swUpdate: SwUpdate,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload()
      })
    }

    // Set translations
    this.translateService.setDefaultLang('es')
    this.translateService.use(this.settingsService.value.lang)

    // Set overlay
    this.overlayContainer.getContainerElement().classList.add('light-theme')
  }
}
