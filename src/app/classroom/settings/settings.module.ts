import { NgModule } from '@angular/core'

import { SettingsRoutingModule } from './settings-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { ConfigurationComponent } from './components/configuration/configuration.component'

import { MatDividerModule } from '@angular/material/divider'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

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
    MatDividerModule,
    MatSlideToggleModule,
  ]
})
export class SettingsModule { }
