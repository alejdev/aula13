import { Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { TranslateService } from '@ngx-translate/core'

import { Language } from './core/interfaces'
import { SettingService } from './shared/services/setting.service'
import { ToastService } from './shared/services/toast.service'

@Component({
  selector: 'a13-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  SwUpdate$: Subscription

  constructor(
    private settingsService: SettingService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.SwUpdate$ = this.swUpdate.available.subscribe(() => {
        this.toastService.info({
          text: 'MSG.APP_UPDATE_READY',
          action: {
            text: 'REFRESH',
            fn: () => window.location.reload()
          }
        }, { duration: undefined })
      })
    }

    // Set translations
    this.translateService.setDefaultLang(Language.es)
    this.translateService.use(this.settingsService.value.lang)
  }

  ngOnDestroy(): void {
    this.SwUpdate$.unsubscribe()
  }
}
