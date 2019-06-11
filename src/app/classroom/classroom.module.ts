import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { ClassroomComponent } from 'src/app/classroom/pages/classroom/classroom.component'
import { ClassroomRoutingModule } from './classroom-routing.module'
import { SubjectListComponent } from 'src/app/classroom/pages/subject-list/subject-list.component'
import { ConfigurationComponent } from 'src/app/classroom/pages/configuration/configuration.component'
import { StudentListComponent } from 'src/app/classroom/pages/student-list/student-list.component'

import { HeaderComponent } from 'src/app/classroom/components/header/header.component'
import { SideMenuComponent } from 'src/app/classroom/components/side-menu/side-menu.component'
import { StudentComponent } from 'src/app/classroom/components/student-card/student-card.component'

import { OrderByPipe } from 'src/app/classroom/pipes/order-by.pipe'
import { StudentPipe } from 'src/app/classroom/pipes/student.pipe'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatRippleModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [
    ClassroomComponent,
    ConfigurationComponent,
    SubjectListComponent,
    StudentListComponent,

    HeaderComponent,
    SideMenuComponent,
    StudentComponent,

    OrderByPipe,
    StudentPipe
  ],
  imports: [
    SharedModule,

    ClassroomRoutingModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatToolbarModule
  ]
})
export class ClassroomModule { }
