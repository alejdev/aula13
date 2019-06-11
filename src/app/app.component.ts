import { Component, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { TranslateService } from '@ngx-translate/core'
import { SettingService } from './shared/services/setting.service'

@Component({
  selector: 'a13-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private settingsService: SettingService,
    private translateService: TranslateService,
    private swUpdate: SwUpdate
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
  }
}
