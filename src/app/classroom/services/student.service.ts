import { Injectable, OnInit } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'

import { LoaderService } from 'src/app/shared/services/loader.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'

import firebase from 'firebase/app'

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
    return this.firestore.collection('users').doc(this.authService.getUserUid())
  }

  private get subCollection(): AngularFirestoreCollection {
    return this.userData.collection(this.subCollectionName)
  }

  // Observables
  public observeStudentList(): any {
    return this.userData
      .collection(this.subCollectionName, ref => {
        return ref
          .orderBy('favorite', 'desc')
          .orderBy('personal.name')
      })
      .snapshotChanges()
  }

  public observeStudent(id: string): any {
    return this.subCollection.doc(id).snapshotChanges()
  }

  // Promises
  public async queryEnrrolledStudents(property: string, classroom: string): Promise<any> {
    const students = await this.userData
      .collection(this.subCollectionName,
        ref => ref.where(property, 'array-contains', classroom)
      )
      .get().toPromise()
    return UtilService.mapColl(students)
  }

  public async getStudentList(): Promise<any> {
    const students = await this.subCollection.get().toPromise()
    return UtilService.mapColl(students)
  }

  public createStudent(data: any): Promise<any> {
    this.loaderService.start()
    return this.subCollection.add(data)
      .finally(() => this.loaderService.stop())
  }

  public async readStudent(id: string): Promise<any> {
    const student = await this.subCollection.doc(id).get().toPromise()
    return UtilService.mapDoc(student)
  }

  public updateStudent(id: string, student: any): Promise<any> {
    this.loaderService.start()
    return this.subCollection
      .doc(id).ref.set(student)
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
