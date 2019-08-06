import { NgModule } from '@angular/core'

import { StudentsRoutingModule } from './students-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { StudentListComponent } from './components/student-list/student-list.component'
import { StudentComponent } from 'src/app/classroom/students/components/student-card/student-card.component'
import { FloatingButtonComponent } from 'src/app/shared/components/floating-button/floating-button.component'

import { OrderByPipe } from 'src/app/classroom/students/pipes/order-by.pipe'
import { StudentPipe } from 'src/app/classroom/students/pipes/student.pipe'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRippleModule } from '@angular/material/core'
import { MatSortModule } from '@angular/material/sort'

@NgModule({
  declarations: [
    StudentListComponent,
    StudentComponent,
    FloatingButtonComponent,

    OrderByPipe,
    StudentPipe
  ],
  imports: [
    // Routing
    StudentsRoutingModule,

    // App modules
    SharedModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSortModule
  ]
})
export class StudentsModule { }
