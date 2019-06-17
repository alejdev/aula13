import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authService: AngularFireAuth,
  ) { }

  public register(control: any) {
    return this.authService.auth
      .createUserWithEmailAndPassword(control.email, control.password)
  }
}
