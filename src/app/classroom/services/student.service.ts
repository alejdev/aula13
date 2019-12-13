import { Injectable } from '@angular/core'

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

  public getStudentList() {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName).snapshotChanges()
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

  public readStudent(id: string) {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).valueChanges()
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
