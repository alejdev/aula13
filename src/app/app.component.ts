import { Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { TranslateService } from '@ngx-translate/core'

import { Language } from './core/interfaces'
import { LoaderService } from './shared/services/loader.service'
import { NetworkService } from './shared/services/network.service'
import { SettingService } from './shared/services/setting.service'
import { ToastService } from './shared/services/toast.service'

@Component({
  selector: 'a13-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  SwUpdate$: Subscription
  isOnline$: Subscription
  firstTime: boolean = true

  constructor(
    private settingsService: SettingService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private swUpdate: SwUpdate,
    private networkService: NetworkService,
    private loaderService: LoaderService,
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

    this.isOnline$ = this.networkService.getStatus()
      .subscribe((isOnline) => {
        if (isOnline) {
          if (!this.firstTime) {
            this.toastService.success({ text: 'NO_NETWORK.ONLINE_AGAIN' })
            this.loaderService.reset()
          }
        } else {
          this.toastService.error({
            text: 'NO_NETWORK.TITLE',
            text2: 'NO_NETWORK.MSG',
            noOk: true
          }, { duration: undefined })
        }
        this.firstTime = false
      })

    // Set translations
    this.translateService.setDefaultLang(Language.es)
    this.translateService.use(this.settingsService.value.lang)
  }

  ngOnDestroy(): void {
    this.SwUpdate$.unsubscribe()
  }
}
