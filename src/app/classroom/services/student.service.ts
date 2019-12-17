import { Injectable } from '@angular/core'
import { take } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

import { LoaderService } from 'src/app/shared/services/loader.service'
import { AuthService } from 'src/app/shared/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private ref: AngularFirestoreCollection = this.firestore.collection('users')
  private subRefName: string = 'students'
  private cachedStudentList: any[] = []

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  public mapStudent(data: any) {
    return {
      id: data.payload.id,
      ...data.payload.data()
    }
  }

  public mapStudentList(data: any) {
    return data.map((elem: any) => {
      return {
        id: elem.payload.doc.id,
        ...elem.payload.doc.data()
      }
    })
  }

  public observeStudentList() {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName).snapshotChanges()
  }

  public getStudentList() {
    this.loaderService.start()
    return this.observeStudentList()
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public getCachedStudentList() {
    return this.cachedStudentList
  }

  public setCachedStudentList(cachedStudentList: any[]) {
    this.cachedStudentList = cachedStudentList
  }

  public createStudent(data: any) {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .add(data)
      .finally(() => this.loaderService.stop())
  }

  public observeStudent(id: string) {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).snapshotChanges()
  }

  public readStudent(id: string) {
    this.loaderService.start()
    return this.observeStudent(id)
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public updateStudent(id: string, student: any) {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.set(student)
      .finally(() => this.loaderService.stop())
  }

  public deleteStudent(id: string) {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.delete()
      .finally(() => this.loaderService.stop())
  }

}
