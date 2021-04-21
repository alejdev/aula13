import { SocialNetwork } from 'src/app/core/interfaces'
import { SOCIAL_NETWORK_LIST } from 'src/app/core/settings'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'a13-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

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
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: [null, Validators.compose([Validators.required])]
    }, { validator: UtilService.passwordMatchValidator })
  }

  signUpWithEmail(): void {
    if (this.formGroup.valid) {
      this.authService.signUp(this.formGroup.value)
    }
  }

  signUpWithSocial(social: string): void {
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
