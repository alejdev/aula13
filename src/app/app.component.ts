import { Component, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'

import { TranslateService } from '@ngx-translate/core'

import { SettingService } from './shared/services/setting.service'
import { ToastService } from './shared/services/toast.service'

@Component({
  selector: 'a13-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private settingsService: SettingService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload()
        this.toastService.info('APP_UPDATED')
      })
    }

    // Set translations
    this.translateService.setDefaultLang('es')
    this.translateService.use(this.settingsService.value.lang)
  }
}
