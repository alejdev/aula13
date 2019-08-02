import { Injectable, HostBinding } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'

import { ToastService } from './toast.service'
import { LoaderService } from './loader.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private success: any
  private error: any

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoaderService,
  ) {
    this.success = (auth: any) => {
      this.loaderService.stop()
      this.toastService.welcome(auth)
      this.router.navigate(['aula'])
    }
    this.error = (error: any) => {
      console.log(error)
      this.loaderService.stop()
      switch (error.code) {
        case 'auth/wrong-password':
          this.toastService.say('ERR.AUTH_INVALID')
          break
        default:
          this.toastService.say('ERR.UNEXPECTED_ERROR')
          break
      }
    }
  }

  public getStatus() {
    return this.angularFireAuth.authState
  }

  public signUp(control: any) {
    this.loaderService.start()
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(control.email, control.password)
      .then(this.success)
      .catch(this.error)
  }

  public signIn(control: any) {
    this.loaderService.start()
    return this.angularFireAuth.auth.signInWithEmailAndPassword(control.email, control.password)
      .then(this.success)
      .catch(this.error)
  }

  public signOut() {
    this.loaderService.start()
    return this.angularFireAuth.auth.signOut()
      .then(() => {
        this.loaderService.stop()
        this.router.navigate(['login'])
        this.toastService.say('MSG.BYE')
      })
      .catch(this.error)
  }
}
