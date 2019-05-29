import { Component, OnInit, HostBinding } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UtilService } from 'src/app/services/util.service'

@Component({
  selector: 'a13-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = 'Aula 13'
  formGroup: FormGroup
  passwordType = 'password'
  @HostBinding('class') classes = 'light-theme'

  constructor(private formBuilder: FormBuilder, private utilService: UtilService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.utilService.regExp.email)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  loginWithEmail(): void {
    // if (this.formGroup.valid) {
    this.router.navigateByUrl('/aula')
    // }
  }

  loginWithGoogle() { }
  loginWithFacebook() { }
  loginWithTwitter() { }

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
      default:
        return ``
    }
  }
}
