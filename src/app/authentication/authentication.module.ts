import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { AuthenticationRoutingModule } from './authentication-routing.module'

import { LoginComponent } from 'src/app/authentication/components/login/login.component'

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    // Routing
    AuthenticationRoutingModule,

    // App modules
    SharedModule
  ]
})
export class AuthenticationModule { }
