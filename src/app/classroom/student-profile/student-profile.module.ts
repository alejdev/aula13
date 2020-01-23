import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { StudentProfileRoutingModule } from './student-profile-routing.module'

import { StudentProfileComponent } from './components/student-profile/student-profile.component'

import { GroupPipe } from './pipes/group.pipe'

import { MatTabsModule } from '@angular/material/tabs'


@NgModule({
  declarations: [
    StudentProfileComponent,
    GroupPipe
  ],
  imports: [
    // Routing
    StudentProfileRoutingModule,

    // App modules
    SharedModule,

    // Material
    MatTabsModule
  ],
  exports: [
    GroupPipe
  ]
})
export class StudentProfileModule { }
