
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'a13-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup: FormGroup
  formValidators: any

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(UtilService.regExp.email)])],
    })
  }

  forgotPassword(): void {
    if (this.formGroup.valid) {
      this.authService.forgotPassword(this.formGroup.value.email)
    }
  }

  hasError(control: string, error: string): any {
    return this.formGroup.get(control).hasError(error)
  }
}
