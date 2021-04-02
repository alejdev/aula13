import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'
import { AuthenticationRoutingModule } from './authentication-routing.module'
import { AuthenticationComponent } from './components/authentication/authentication.component'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { SignUpComponent } from './components/sign-up/sign-up.component'

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthenticationComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    // Routing
    AuthenticationRoutingModule,

    // App modules
    SharedModule,
  ]
})
export class AuthenticationModule { }
