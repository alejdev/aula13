import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from './services/setting.service';

@Component({
  selector: 'a13-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private swUpdate: SwUpdate, settingsService: SettingService, translateService: TranslateService) {
    translateService.setDefaultLang('es')
    translateService.use(settingsService.value.lang)
  }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload()
      })
    }
  }
}