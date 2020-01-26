import { Injectable } from '@angular/core'
import { take } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

import { LoaderService } from 'src/app/shared/services/loader.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private ref: AngularFirestoreCollection = this.firestore.collection('users')
  private subRefName: string = 'subjects'
  private cachedSubjectList: any[] = []

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  public mapSubject(data: any): any {
    return {
      id: data.payload.id,
      ...data.payload.data()
    }
  }

  public mapSubjectList(data: any): any {
    return data.map((elem: any) => {
      return {
        id: elem.payload.doc.id,
        ...elem.payload.doc.data()
      }
    })
  }

  public observeSubjectList(): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName, ref => ref.orderBy('name'))
      .snapshotChanges()
  }

  public getSubjectList(): any {
    this.loaderService.start()
    return this.observeSubjectList()
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public getCachedSubjectList(): any {
    return this.cachedSubjectList
  }

  public setCachedSubjectList(cachedSubjectList: any[]): void {
    this.cachedSubjectList = cachedSubjectList
  }

  public createSubject(data: any): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .add(data)
      .finally(() => this.loaderService.stop())
  }

  public observeSubject(id: string): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).snapshotChanges()
  }

  public readSubject(id: string): any {
    this.loaderService.start()
    return this.observeSubject(id)
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public querySubject(name: string): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName, ref => {
        return ref.where('name', '==', name)
      })
      .snapshotChanges()
  }

  public updateSubject(id: string, subject: any): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.set(subject)
      .finally(() => this.loaderService.stop())
  }

  public deleteSubject(id: string): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.delete()
      .finally(() => this.loaderService.stop())
  }

}
