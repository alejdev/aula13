import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationComponent } from './components/authentication/authentication.component'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { SignUpComponent } from './components/sign-up/sign-up.component'

const routes: Routes = [{
  path: '',
  component: AuthenticationComponent,
  children: [{
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full'
  }, {
    path: 'signIn',
    component: SignInComponent
  }, {
    path: 'signUp',
    component: SignUpComponent
  }, {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
