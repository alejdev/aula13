import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { SharedModule } from 'src/app/shared/shared.module'

import { NgModule } from '@angular/core'

import { DayListComponent } from './components/day-list/day-list.component'
import { DailyRoutingModule } from './daily-routing.module'
import { SubjectDayPipe } from './pipes/subject-day.pipe'

@NgModule({
  declarations: [
    DayListComponent,
    SubjectDayPipe
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
