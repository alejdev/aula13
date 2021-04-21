import { Observable } from 'rxjs'
import { Subject } from 'src/app/core/interfaces'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subCollectionName: string = 'subjects'
  private _cachedSubjectList: any[] = []

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  // Collections
  private get userData(): AngularFirestoreDocument {
    return this.firestore.collection('users').doc(this.authService.userUid)
  }

  private get subCollection(): AngularFirestoreCollection {
    return this.userData.collection(this.subCollectionName)
  }

  public get cachedSubjects(): Subject[] {
    return this._cachedSubjectList
  }

  public set cachedSubjects(list: Subject[]) {
    this._cachedSubjectList = list
  }

  // Observables
  public observeSubjectList(): Observable<any> {
    return this.userData
      .collection(this.subCollectionName, ref => ref.orderBy('name'))
      .snapshotChanges()
  }

  public observeSubject(id: string): Observable<any> {
    return this.subCollection.doc(id).snapshotChanges()
  }

  public querySubject(name: string): Observable<any> {
    return this.userData
      .collection(this.subCollectionName, ref => ref.where('name', '==', name))
      .snapshotChanges()
  }

  // Promises
  public async getSubjectList(): Promise<any> {
    this.loaderService.load()
    const subjects = await this.subCollection.get().toPromise()
    this.loaderService.down()
    return UtilService.mapCollection(subjects)
  }

  public createSubject(data: any): Promise<any> {
    this.loaderService.load()
    return this.subCollection.add(data)
      .finally(() => this.loaderService.down())
  }

  public async readSubject(id: string): Promise<any> {
    this.loaderService.load()
    const student = await this.subCollection.doc(id).get().toPromise()
    this.loaderService.down()
    return UtilService.mapDocument(student)
  }

  public updateSubject(id: string, subject: any): Promise<any> {
    this.loaderService.load()
    return this.subCollection.doc(id).ref.set(subject)
      .finally(() => this.loaderService.down())
  }

  public deleteSubject(id: string): Promise<any> {
    this.loaderService.load()
    return this.subCollection.doc(id).ref.delete()
      .finally(() => this.loaderService.down())
  }

}
