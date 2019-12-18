import { Injectable } from '@angular/core'
import { take } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore'

import { LoaderService } from 'src/app/shared/services/loader.service'
import { AuthService } from 'src/app/shared/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private ref: AngularFirestoreCollection = this.firestore.collection('users')
  private subRefName: string = 'days'

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  public mapDay(data: any): any {
    return {
      id: data.payload.id,
      ...data.payload.data()
    }
  }

  public mapDayList(data: any, studentList: any): any {
    return data.map((elem: any) => {
      const docData = elem.payload.doc.data()
      return {
        id: elem.payload.doc.id,
        student: studentList.find((student: any) => student.id === docData.studentId),
        ...docData
      }
    })
  }

  public observeDayList(): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName).snapshotChanges()
  }

  public getDayList(): any {
    this.loaderService.start()
    return this.observeDayList()
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public createDay(data: any): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .add(data)
      .finally(() => this.loaderService.stop())
  }

  public observeDay(id: string): any {
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).snapshotChanges()
  }

  public readDay(id: string): any {
    this.loaderService.start()
    return this.observeDay(id)
      .pipe(take(1))
      .toPromise()
      .finally(() => this.loaderService.stop())
  }

  public updateDay(id: string, day: any): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.set(day)
      .finally(() => this.loaderService.stop())
  }

  public deleteDay(id: string): any {
    this.loaderService.start()
    return this.ref
      .doc(this.authService.getUserUid())
      .collection(this.subRefName)
      .doc(id).ref.delete()
      .finally(() => this.loaderService.stop())
  }
}
