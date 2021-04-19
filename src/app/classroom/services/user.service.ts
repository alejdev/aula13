import { Observable } from 'rxjs'
import { User } from 'src/app/core/interfaces'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { UtilService } from 'src/app/shared/services/util.service'

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

  public async readUser(): Promise<any> {
    this.loaderService.load()
    const user = await this.userData.get().toPromise()
    this.loaderService.down()
    return UtilService.mapDocument(user)
  }

  public updateUser(user: User): Promise<any> {
    this.loaderService.load()
    return this.userData.ref.set(user)
      .finally(() => this.loaderService.down())
  }

  public deleteUserAccount(): Promise<any> {
    this.loaderService.load()
    return this.userData.ref.delete()
      .then(() => this.authService.deleteAccount())
      .finally(() => this.loaderService.down())
  }
}
