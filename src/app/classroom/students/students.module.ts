import { StudentComponent } from 'src/app/classroom/students/components/student-card/student-card.component'
import { SharedModule } from 'src/app/shared/shared.module'

import { NgModule } from '@angular/core'

import { PickupImageComponent, PickupImageDialogComponent } from '../components/pickup-image/pickup-image.component'
import { StudentCreationComponent } from './components/student-creation/student-creation.component'
import { StudentListComponent } from './components/student-list/student-list.component'
import { OrderByPipe } from './pipes/order-by.pipe'
import { StudentsRoutingModule } from './students-routing.module'

@NgModule({
  declarations: [
    StudentListComponent,
    StudentComponent,
    StudentCreationComponent,
    PickupImageComponent,
    PickupImageDialogComponent,

    OrderByPipe
  ],
  imports: [
    // Routing
    StudentsRoutingModule,

    // App modules
    SharedModule
  ],
  entryComponents: [
    StudentCreationComponent,
    PickupImageDialogComponent
  ]
})
export class StudentsModule { }
