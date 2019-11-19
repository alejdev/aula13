import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { StudentProfileRoutingModule } from './student-profile-routing.module'

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'
import { MatSelectModule } from '@angular/material/select'
import { MatGridListModule } from '@angular/material'
import { MatMenuModule } from '@angular/material/menu'

import { StudentProfileComponent } from './components/student-profile/student-profile.component'
@NgModule({
  declarations: [
    StudentProfileComponent
  ],
  imports: [
    // Routing
    StudentProfileRoutingModule,

    // App modules
    SharedModule,

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule
  ]
})
export class StudentProfileModule { }
