import { Observable } from 'rxjs'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private subCollectionName: string = 'classrooms'
  private cachedClassroomList: any[] = []

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

  public get cachedClassrooms(): any[] {
    return this.cachedClassroomList
  }

  public set cachedClassrooms(cachedClassroomList: any[]) {
    this.cachedClassroomList = cachedClassroomList
  }

  // Observables
  public observeClassroomList(): Observable<any> {
    return this.userData
      .collection(this.subCollectionName, ref => ref.orderBy('name'))
      .snapshotChanges()
  }

  public observeClassroom(id: string): Observable<any> {
    return this.subCollection.doc(id).snapshotChanges()
  }

  public queryClassroom(name: string): Observable<any> {
    return this.userData
      .collection(this.subCollectionName, ref => ref.where('name', '==', name))
      .snapshotChanges()
  }

  // Promises
  public async getClassroomList(): Promise<any> {
    this.loaderService.load()
    const classrooms = await this.subCollection.get().toPromise()
    this.loaderService.down()
    return UtilService.mapCollection(classrooms)
  }

  public createClassroom(data: any): Promise<any> {
    this.loaderService.load()
    return this.subCollection.add(data)
      .finally(() => this.loaderService.down())
  }

  public async readClassroom(id: string): Promise<any> {
    this.loaderService.load()
    const student = await this.subCollection.doc(id).get().toPromise()
    this.loaderService.down()
    return UtilService.mapDocument(student)
  }

  public updateClassroom(id: string, classroom: any): Promise<any> {
    this.loaderService.load()
    return this.subCollection.doc(id).ref.set(classroom)
      .finally(() => this.loaderService.down())
  }

  public deleteClassroom(id: string): Promise<any> {
    this.loaderService.load()
    return this.subCollection.doc(id).ref.delete()
      .finally(() => this.loaderService.down())
  }

}
