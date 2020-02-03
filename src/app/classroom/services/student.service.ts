import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import firebase from 'firebase/app'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'

import { LoaderService } from 'src/app/shared/services/loader.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private subCollectionName: string = 'students'

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

  // Observables
  public observeStudentList(): Observable<any> {
    return this.userData
      .collection(this.subCollectionName, ref => {
        return ref
          .orderBy('favorite', 'desc')
          .orderBy('personal.name')
      })
      .snapshotChanges()
  }

  public observeStudent(id: string): Observable<any> {
    return this.subCollection.doc(id).snapshotChanges()
  }

  // Promises
  public async queryEnrrolledStudents(property: string, classroom: string): Promise<any> {
    this.loaderService.start()
    const students = await this.userData
      .collection(this.subCollectionName,
        ref => ref.where(property, 'array-contains', classroom)
      )
      .get().toPromise()
    this.loaderService.stop()
    return UtilService.mapCollection(students)
  }

  public async getStudentList(): Promise<any> {
    this.loaderService.start()
    const students = await this.subCollection.get().toPromise()
    this.loaderService.stop()
    return UtilService.mapCollection(students)
  }

  public createStudent(data: any): Promise<any> {
    this.loaderService.start()
    return this.subCollection.add(data)
      .finally(() => this.loaderService.stop())
  }

  public async readStudent(id: string): Promise<any> {
    this.loaderService.start()
    const student = await this.subCollection.doc(id).get().toPromise()
    this.loaderService.stop()
    return UtilService.mapDocument(student)
  }

  public updateStudent(id: string, student: any): Promise<any> {
    this.loaderService.start()
    return this.subCollection.doc(id).ref.set(student)
      .finally(() => this.loaderService.stop())
  }

  public updateStudentBatch(students: any[]): Promise<any> {
    this.loaderService.start()
    const batch = firebase.firestore().batch()
    students
      .filter(student => student)
      .forEach((student: any) => {
        const ref = this.subCollection.doc(student.id).ref
        delete student.id
        batch.update(ref, student)
      })
    return batch.commit()
      .finally(() => this.loaderService.stop())
  }

  public deleteStudent(id: string): Promise<any> {
    this.loaderService.start()
    return this.subCollection.doc(id).ref.delete()
      .finally(() => this.loaderService.stop())
  }

}
