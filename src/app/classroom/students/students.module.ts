import { NgModule } from '@angular/core'

import { StudentsRoutingModule } from './students-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { StudentListComponent } from './components/student-list/student-list.component'
import { StudentCreationComponent } from './components/student-creation/student-creation.component'
import { StudentComponent } from 'src/app/classroom/students/components/student-card/student-card.component'
import { PickupImageComponent, PickupImageDialogComponent } from '../components/pickup-image/pickup-image.component'

import { OrderByPipe } from './pipes/order-by.pipe'
import { StudentPipe } from './pipes/student.pipe'

@NgModule({
  declarations: [
    StudentListComponent,
    StudentComponent,
    StudentCreationComponent,
    PickupImageComponent,
    PickupImageDialogComponent,

    OrderByPipe,
    StudentPipe,
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
