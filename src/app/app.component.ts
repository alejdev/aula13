import { Component, OnInit, OnDestroy } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { Subscription } from 'rxjs'

import { TranslateService } from '@ngx-translate/core'

import { SettingService } from './shared/services/setting.service'
import { ToastService } from './shared/services/toast.service'

@Component({
  selector: 'a13-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  SwUpdateSubscription: Subscription

  constructor(
    private settingsService: SettingService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.SwUpdateSubscription = this.swUpdate.available.subscribe(() => {
        this.toastService.info('MSG.APP_UPDATED')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      })
    }

    // Set translations
    this.translateService.setDefaultLang('es')
    this.translateService.use(this.settingsService.value.lang)
  }

  ngOnDestroy(): void {
    this.SwUpdateSubscription.unsubscribe()
  }
}
