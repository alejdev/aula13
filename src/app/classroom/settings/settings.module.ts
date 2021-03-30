import { SharedModule } from 'src/app/shared/shared.module'

import { NgModule } from '@angular/core'
import { MatDividerModule } from '@angular/material/divider'

import { ConfigurationComponent } from './components/configuration/configuration.component'
import { SettingsRoutingModule } from './settings-routing.module'

@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    // Routing
    SettingsRoutingModule,

    // App modules
    SharedModule,

    // Material
    MatDividerModule
  ]
})
export class SettingsModule { }
