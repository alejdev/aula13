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

  public getStatus(): any {
    return this.angularFireAuth.authState
  }

  public getUserUid(): any {
    return this.userUid
  }

  public setUserUid(uid: string): void {
    this.userUid = uid
  }

  public getUserLogged(): any {
    return this.userLogged
  }

  public setUserLogged(user: any): void {
    this.userLogged = user
    console.log(this.userLogged)
  }

  public signUp(control: any): any {
    this.loaderService.start()
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(control.email, control.password)
      .then((auth: any) => this.createUser(auth.user))
      .catch(this.error)
      .finally(() => this.loaderService.stop())
  }

  public signIn(control: any): any {
    this.loaderService.start()
    return this.angularFireAuth.auth.signInWithEmailAndPassword(control.email, control.password)
      .then((auth: any) => {
        this.router.navigate(['aula'])
        this.toastService.welcome(auth)
      })
      .catch(this.error)
      .finally(() => this.loaderService.stop())
  }

  public loginWithGoogle(): void {
    this.toastService.info('MSG.SERVICE_NOT_AVAILABLE')
  }
  public loginWithFacebook(): void {
    this.toastService.info('MSG.SERVICE_NOT_AVAILABLE')
  }
  public loginWithTwitter(): void {
    this.toastService.info('MSG.SERVICE_NOT_AVAILABLE')
  }

  public signOut(): any {
    this.loaderService.start()
    return this.angularFireAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['login'])
        this.toastService.say('MSG.BYE')
      })
      .catch(this.error)
      .finally(() => this.loaderService.stop())
  }

  private createUser(data: any): any {
    this.loaderService.start()
    return this.ref
      .doc(data.uid)
      .set({
        creationDate: data.metadata.a,
        email: data.email,
        id: data.uid,
        name: data.displayName
      })
      .then((auth: any) => {
        this.router.navigate(['aula'])
        this.toastService.welcome(auth)
      })
      .catch(this.error)
      .finally(() => this.loaderService.stop())
  }

  public readUser(id: any): any {
    this.loaderService.start()
    return this.ref
      .doc(id).ref.get()
      .finally(() => this.loaderService.stop())
  }

}
