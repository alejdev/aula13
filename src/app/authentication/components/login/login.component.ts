import { Component, HostBinding, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'

@Component({
  selector: 'a13-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = 'Aula 13'
  formGroup: FormGroup
  formValidators: any
  model: any
  passwordType = 'password'
  login: boolean = true
  @HostBinding('class') classes = 'light-theme'

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formValidators = {
      email: [null, Validators.compose([Validators.required, Validators.pattern(UtilService.regExp.email)])],
      password: [null, Validators.compose([Validators.required])],
    }
    this.formGroup = this.createSignInForm()
  }

  loginWithEmail(): void {
    if (this.formGroup.valid) {
      if (this.login) {
        this.authService.signIn(this.formGroup.value)
      } else {
        this.authService.signUp(this.formGroup.value)
      }
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook()
  }

  loginWithTwitter() {
    this.authService.loginWithTwitter()
  }

  toggleSign() {
    this.login = !this.login
    this.model = this.formGroup.controls
    this.formGroup = this.login ? this.createSignInForm() : this.createSignUpForm()

    // Set old values to new formGroup
    for (const key in this.model) {
      if (this.formGroup.controls.hasOwnProperty(key)) {
        this.formGroup.controls[key].setValue(this.model[key].value)
      }
    }
  }

  createSignInForm(): FormGroup {
    return this.formBuilder.group(this.formValidators)
  }

  createSignUpForm(): FormGroup {
    return this.formBuilder.group(
      {
        ...this.formValidators,
        password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      { validator: UtilService.passwordMatchValidator }
    )
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
  }

  getError(type: string): string {
    const form = this.formGroup.get(type)
    switch (true) {
      case type === 'email' && form.hasError('required'):
        return `ERR.EMAIL_REQUIRED`
      case type === 'email' && form.hasError('pattern'):
        return `ERR.EMAIL_INVALID`
      case type === 'password' && form.hasError('required'):
        return `ERR.PASSWORD_REQUIRED`
      case type === 'password' && form.hasError('minlength'):
        return `ERR.PASSWORD_INVALID`
      case type === 'confirmPassword' && form.hasError('required'):
        return `ERR.CONFIRM_PASSWORD_REQUIRED`
      case type === 'confirmPassword' && form.hasError('notSame'):
        return `ERR.CONFIRM_PASSWORD_NOT_MATCH`
      default:
        return ``
    }
  }

  getSignOptions() {
    return {
      button: {
        color: this.login ? 'accent' : 'primary',
        text: this.login ? 'SIGN.IN' : 'SIGN.UP',
      },
      footer: {
        color: this.login ? 'primary' : 'accent',
        hint: this.login ? 'MSG.NO_ACCOUNT' : 'MSG.YES_ACCOUNT',
        text: this.login ? 'SIGN.UP' : 'SIGN.IN',
      }
    }
  }
}
