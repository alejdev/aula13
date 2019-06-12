import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { AuthenticationRoutingModule } from './authentication-routing.module'

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { LoginComponent } from 'src/app/authentication/components/login/login.component'

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,

    AuthenticationRoutingModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ]
})
export class AuthenticationModule { }
