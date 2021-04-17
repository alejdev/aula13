import { Observable } from 'rxjs'
import { User } from 'src/app/core/interfaces'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoaderService } from 'src/app/shared/services/loader.service'

import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService,
  ) { }

  private get userData(): AngularFirestoreDocument {
    return this.firestore.collection('users').doc(this.authService.userUid)
  }

  public observeUser(): Observable<any> {
    return this.userData.snapshotChanges()
  }

  public updateUser(user: User): Promise<any> {
    this.loaderService.load()
    return this.userData.ref.set(user)
      .finally(() => this.loaderService.down())
  }

  public deleteUser(): Promise<any> {
    this.loaderService.load()
    return this.userData.ref.delete()
      .finally(() => this.loaderService.down())
  }
}
