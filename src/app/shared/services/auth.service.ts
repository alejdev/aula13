import { Injectable, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

import { ToastService } from './toast.service'
import { LoaderService } from './loader.service'
import { Observable } from 'rxjs'

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
    this.loaderService.start()
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(control.email, control.password)
      .then((auth: any) => this.createUser(auth.user))
      .catch(this.error)
      .finally(() => this.loaderService.stop())
  }

  public signIn(control: any): Promise<any> {
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

  public signOut(): Promise<any> {
    this.loaderService.start()
    return this.angularFireAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['login'])
        this.toastService.say('MSG.BYE')
      })
      .catch(this.error)
      .finally(() => this.loaderService.stop())
  }

  private createUser(data: any): Promise<any> {
    this.loaderService.start()
    return this.userData
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

  public readUser(id: any): Promise<any> {
    this.loaderService.start()
    return this.userData.doc(id).ref.get()
      .finally(() => this.loaderService.stop())
  }

}
