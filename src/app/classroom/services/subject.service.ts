import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'

import { LoaderService } from 'src/app/shared/services/loader.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { Observable } from 'rxjs'
import { UtilService } from 'src/app/shared/services/util.service'

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subCollectionName: string = 'subjects'
  private cachedSubjectList: any[] = []

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  // Collections
  private get userData(): AngularFirestoreDocument {
    return this.firestore.collection('users').doc(this.authService.getUserUid())
  }

  private get subCollection(): AngularFirestoreCollection {
    return this.userData.collection(this.subCollectionName)
  }

  public get cachedSubjects(): any[] {
    return this.cachedSubjectList
  }

  public set cachedSubjects(cachedSubjectList: any[]) {
    this.cachedSubjectList = cachedSubjectList
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
    this.loaderService.start()
    const subjects = await this.subCollection.get().toPromise()
    this.loaderService.stop()
    return UtilService.mapColl(subjects)
  }

  public createSubject(data: any): Promise<any> {
    this.loaderService.start()
    return this.subCollection.add(data)
      .finally(() => this.loaderService.stop())
  }

  public async readSubject(id: string): Promise<any> {
    this.loaderService.start()
    const student = await this.subCollection.doc(id).get().toPromise()
    this.loaderService.stop()
    return UtilService.mapDoc(student)
  }

  public updateSubject(id: string, subject: any): Promise<any> {
    this.loaderService.start()
    return this.subCollection.doc(id).ref.set(subject)
      .finally(() => this.loaderService.stop())
  }

  public deleteSubject(id: string): Promise<any> {
    this.loaderService.start()
    return this.subCollection.doc(id).ref.delete()
      .finally(() => this.loaderService.stop())
  }

}
