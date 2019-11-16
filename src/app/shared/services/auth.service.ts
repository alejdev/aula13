import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

import { ToastService } from './toast.service'
import { LoaderService } from './loader.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private error: any
  private userUid: string = null
  private userLogged: any = null
  private ref: AngularFirestoreCollection = this.firestore.collection('users')

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) {
    this.error = (error: any) => {
      console.log(error)
      this.loaderService.stop()
      switch (error.code) {
        case 'auth/wrong-password':
          this.toastService.error('ERR.AUTH_INVALID')
          break
        case 'auth/email-already-in-use':
          this.toastService.error('ERR.EMAIL_ALREADY_IN_USE')
          break
        case 'auth/user-not-found':
          this.toastService.error('ERR.USER_NOT_FOUND')
          break
        default:
          this.toastService.error('ERR.UNEXPECTED_ERROR')
          break
      }
    }
  }

  public getStatus() {
    return this.angularFireAuth.authState
  }

  public getUserUid() {
    return this.userUid
  }

  public setUserUid(uid: string) {
    this.userUid = uid
  }

  public getUserLogged() {
    return this.userLogged
  }

  public setUserLogged(user: any) {
    this.userLogged = user
    console.log(this.userLogged)
  }

  public signUp(control: any) {
    this.loaderService.start()
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(control.email, control.password)
      .then((auth: any) => this.createUser(auth.user))
      .catch(this.error)
  }

  public signIn(control: any) {
    this.loaderService.start()
    return this.angularFireAuth.auth.signInWithEmailAndPassword(control.email, control.password)
      .then((auth: any) => {
        this.router.navigate(['aula'])
        this.toastService.welcome(auth)
      })
      .catch(this.error)
      .finally(() => this.loaderService.stop())
  }

  public loginWithGoogle() {
    this.toastService.info('MSG.SERVICE_NOT_AVAILABLE')
  }
  public loginWithFacebook() {
    this.toastService.info('MSG.SERVICE_NOT_AVAILABLE')
  }
  public loginWithTwitter() {
    this.toastService.info('MSG.SERVICE_NOT_AVAILABLE')
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
      .finally(() => this.loaderService.stop())
  }

  private createUser(data: any) {
    return this.ref
      .doc(data.uid)
      .set({
        id: data.uid,
        metadata: {
          creationDate: data.metadata.a,
          email: data.email,
          name: data.displayName
        },
        data: {}
      })
      .then((auth: any) => {
        this.router.navigate(['aula'])
        this.toastService.welcome(auth)
      })
      .catch(this.error)
      .finally(() => this.loaderService.stop())
  }
}
