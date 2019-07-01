import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) { }

  public signUp(control: any) {
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(control.email, control.password)
  }

  public signIn(control: any) {
    return this.angularFireAuth.auth
      .signInWithEmailAndPassword(control.email, control.password)
  }

  public getStatus() {
    return this.angularFireAuth.authState
  }

  public signOut() {
    return this.angularFireAuth.auth.signOut()
  }
}
