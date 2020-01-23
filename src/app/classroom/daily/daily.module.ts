import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { DailyRoutingModule } from './daily-routing.module'

import { DayListComponent } from './components/day-list/day-list.component'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'

@NgModule({
  declarations: [
    DayListComponent
  ],
  imports: [
    // Routing
    DailyRoutingModule,

    // App modules
    SharedModule
  ],
  entryComponents: [
    DayCreationComponent
  ]
})
export class DailyModule { }
