import { NgModule } from '@angular/core'

import { DayProfileRoutingModule } from './day-profile-routing.module'
import { DayProfileComponent } from './components/day-profile/day-profile.component'
import { SharedModule } from 'src/app/shared/shared.module'


@NgModule({
  declarations: [
    DayProfileComponent
  ],
  imports: [
    // Routing
    DayProfileRoutingModule,

    // App modules
    SharedModule
  ]
})
export class DayProfileModule { }
