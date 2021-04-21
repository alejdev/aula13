import { SharedModule } from 'src/app/shared/shared.module'

import { NgModule } from '@angular/core'

import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { UserProfileRoutingModule } from './user-profile-routing.module'

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    // Routing
    UserProfileRoutingModule,

    // App modules
    SharedModule
  ]
})
export class UserProfileModule { }
