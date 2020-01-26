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

  public mapStudent(data: any): any {
    return {
      id: data.payload.id,
      ...data.payload.data()
    }
  }

  public mapStudentList(data: any): any {
    return data.map((elem: any) => {
      return {
        id: elem.payload.doc.id,
        ...elem.payload.doc.data()
      }
    })
  }

  public observeStudentList(): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName, ref => {
        return ref
          .orderBy('favorite', 'desc')
          .orderBy('personal.name')
      })
      .snapshotChanges()
  }

  public getStudentList(): any {
    this.loaderService.start()
    return this.observeStudentList()
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public getCachedStudentList(): any {
    return this.cachedStudentList
  }

  public setCachedStudentList(cachedStudentList: any[]): void {
    this.cachedStudentList = cachedStudentList
  }

  public createStudent(data: any): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .add(data)
      .finally(() => this.loaderService.stop())
  }

  public observeStudent(id: string): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).snapshotChanges()
  }

  public readStudent(id: string): any {
    this.loaderService.start()
    return this.observeStudent(id)
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public updateStudent(id: string, student: any): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.set(student)
      .finally(() => this.loaderService.stop())
  }

  public deleteStudent(id: string): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.delete()
      .finally(() => this.loaderService.stop())
  }

}
