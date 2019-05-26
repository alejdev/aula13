import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'a13-login',
  host: {'class': 'light-theme'},
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = 'Aula 13'
  formGroup: FormGroup;
  passwordType = 'password'

  constructor(private formBuilder: FormBuilder, private utilService: UtilService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.utilService.regExp.email)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      validate: ''
    })
  }

  loginWithEmail() {
    if (this.formGroup.valid) {
      this.router.navigateByUrl('/aula')
    }
  }

  loginWithGoogle() { }
  loginWithFacebook() { }
  loginWithTwitter() { }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
  }

  getErrorEmail() {
    switch (true) {
      case this.formGroup.get('email').hasError('required'):
        return `El email es obligatorio`
      case this.formGroup.get('email').hasError('pattern'):
        return `Por favor, introduce un email válido`
      default:
        return ``
    }
  }

  getErrorPassword() {
    switch (true) {
      case this.formGroup.get('password').hasError('required'):
        return `La contraseña es obligatoria`
      case this.formGroup.get('password').hasError('minlength'):
        return `La contraseña debe tener al menos 6 caracteres`
      default:
        return ``
    }
  }
}