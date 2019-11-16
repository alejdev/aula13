import { NgModule } from '@angular/core'

import { StudentsRoutingModule } from './students-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { StudentListComponent } from './components/student-list/student-list.component'
import { StudentCreationComponent } from './components/student-creation/student-creation.component'
import { StudentComponent } from 'src/app/classroom/students/components/student-card/student-card.component'
import { FloatingButtonComponent } from 'src/app/shared/components/floating-button/floating-button.component'
import { PickupImageComponent, PickupImageDialogComponent } from '../components/pickup-image/pickup-image.component'

import { OrderByPipe } from 'src/app/classroom/students/pipes/order-by.pipe'
import { StudentPipe } from 'src/app/classroom/students/pipes/student.pipe'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRippleModule } from '@angular/material/core'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [
    StudentListComponent,
    StudentComponent,
    StudentCreationComponent,
    FloatingButtonComponent,
    PickupImageComponent,
    PickupImageDialogComponent,

    OrderByPipe,
    StudentPipe,
  ],
  imports: [
    // Routing
    StudentsRoutingModule,

    // App modules
    SharedModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSortModule,
    MatStepperModule,
    MatSelectModule

  ],
  entryComponents: [
    StudentCreationComponent,
    PickupImageDialogComponent
  ]
})
export class StudentsModule { }
