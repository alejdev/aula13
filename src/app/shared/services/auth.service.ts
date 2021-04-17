import { auth } from 'firebase/app'
import { Observable } from 'rxjs'

import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Router } from '@angular/router'

import { LoaderService } from './loader.service'
import { ToastService } from './toast.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private error: any
  private userUidValue: string

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) {
    this.error = (error: any) => {
      switch (error.code) {
        case 'auth/wrong-password':
          this.toastService.error({ text: 'ERR.AUTH_INVALID' })
          break
        case 'auth/email-already-in-use':
          this.toastService.error({ text: 'ERR.EMAIL_ALREADY_IN_USE' })
          break
        case 'auth/user-not-found':
          this.toastService.error({ text: 'ERR.USER_NOT_FOUND' })
          break
        default:
          this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
          break
      }
    }
  }

  // Collections
  private get userData(): AngularFirestoreCollection {
    return this.firestore.collection('users')
  }

  public get userUid(): string {
    return this.userUidValue
  }

  public set userUid(uid: string) {
    this.userUidValue = uid
  }

  // Observables
  public getStatus(): Observable<any> {
    return this.angularFireAuth.authState
  }

  // Promises
  public signUp(control: any): Promise<any> {
    this.loaderService.load()
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(control.email, control.password)
      .then((authData: any) => this.createUser(authData.user))
      .catch(this.error)
      .finally(() => this.loaderService.down())
  }

  public signIn(control: any): Promise<any> {
    this.loaderService.load()
    return this.angularFireAuth.auth.signInWithEmailAndPassword(control.email, control.password)
      .then((authData: any) => {
        this.router.navigate(['classroom'])
        this.toastService.welcome({ user: authData })
      })
      .catch(this.error)
      .finally(() => this.loaderService.down())
  }

  public loginWithGoogle(): void {
    // this.toastService.info({ text: 'MSG.SERVICE_NOT_AVAILABLE' })
    this.loginWithPopup(new auth.GoogleAuthProvider())
  }

  public loginWithFacebook(): void {
    this.toastService.info({ text: 'MSG.SERVICE_NOT_AVAILABLE' })
    // this.loginWithPopup(new auth.FacebookAuthProvider())
  }

  public loginWithTwitter(): void {
    this.toastService.info({ text: 'MSG.SERVICE_NOT_AVAILABLE' })
    // this.loginWithPopup(new auth.TwitterAuthProvider())
  }

  public loginWithPopup(provider: any): Promise<void> {
    return this.angularFireAuth.auth.signInWithPopup(provider)
      .then((authData: any) => {
        if (authData.additionalUserInfo.isNewUser) {
          this.createUser(authData.user)
        } else {
          this.router.navigate(['classroom'])
          this.toastService.welcome({ user: authData })
        }
      })
      .catch(this.error)
      .finally(() => this.loaderService.down())
  }

  public forgotPassword(email: string): Promise<any> {
    this.loaderService.load()
    return this.angularFireAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['authentication'])
        this.toastService.info({ text: 'MSG.FORGOT_PASSWORD_EMAIL' })
      })
      .catch(this.error)
      .finally(() => this.loaderService.down())
  }

  public signOut(): Promise<any> {
    this.loaderService.load()
    return this.angularFireAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['authentication'])
        this.toastService.info({ text: 'MSG.BYE' })
      })
      .catch(this.error)
      .finally(() => this.loaderService.down())
  }

  private createUser(data: any): Promise<any> {
    this.loaderService.load()
    return this.userData
      .doc(data.uid)
      .set({
        creationDate: data.metadata.a,
        email: data.email,
        id: data.uid,
        name: data.displayName,
        avatar: data.photoURL
      })
      .then((authData: any) => {
        this.router.navigate(['classroom'])
        this.toastService.welcome({ user: authData })
      })
      .catch(this.error)
      .finally(() => this.loaderService.down())
  }

  public readUser(id: any): Promise<any> {
    this.loaderService.load()
    return this.userData.doc(id).ref.get()
      .finally(() => this.loaderService.down())
  }

}
