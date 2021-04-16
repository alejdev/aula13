import { SocialNetwork } from 'src/app/core/interfaces'
import { SOCIAL_NETWORK_LIST } from 'src/app/core/settings'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'a13-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formGroup: FormGroup
  formValidators: any
  passwordType = 'password'

  signInSocialNetworks: SocialNetwork[] = SOCIAL_NETWORK_LIST

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(UtilService.regExp.email)])],
      password: [null, Validators.compose([Validators.required])],
    })
  }

  signInWithEmail(): void {
    if (this.formGroup.valid) {
      this.authService.signIn(this.formGroup.value)
    }
  }

  signInWithSocial(social: string): void {
    switch (social) {
      case 'google':
        this.authService.loginWithGoogle()
        break
      case 'facebook':
        this.authService.loginWithFacebook()
        break
      case 'twitter':
        this.authService.loginWithTwitter()
        break
    }
  }

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
  }

  hasError(control: string, error: string): any {
    return this.formGroup.get(control).hasError(error)
  }
}
