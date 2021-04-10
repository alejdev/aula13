import { SharedModule } from 'src/app/shared/shared.module'

import { NgModule } from '@angular/core'

import { ConfigurationComponent } from './components/configuration/configuration.component'
import { CreditsComponent } from './components/credits/credits.component'
import { SettingsRoutingModule } from './settings-routing.module'

@NgModule({
  declarations: [
    ConfigurationComponent,
    CreditsComponent,
  ],
  imports: [
    // Routing
    SettingsRoutingModule,

    // App modules
    SharedModule
  ]
})
export class SettingsModule { }
