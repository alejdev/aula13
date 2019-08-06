import { NgModule } from '@angular/core'

import { StudentProfileRoutingModule } from './student-profile-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { StudentProfileComponent } from './components/student-profile/student-profile.component'

@NgModule({
  declarations: [
    StudentProfileComponent
  ],
  imports: [
    // Routing
    StudentProfileRoutingModule,

    // App modules
    SharedModule
  ]
})
export class StudentProfileModule { }
