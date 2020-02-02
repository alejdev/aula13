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
export class DayService {

  private subCollectionName: string = 'days'

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

  private dayList(key: string, operator: any, value: any): AngularFirestoreCollection<any> {
    return this.userData
      .collection(this.subCollectionName, ref => {
        return ref
          .where(key, operator, value)
          .orderBy('date', 'desc')
      })
  }

  // Observables
  public observeDayList(): Observable<any> {
    return this.userData
      .collection(this.subCollectionName, ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
  }

  public observeQueryDayList(key: string, operator: any, value: any): Observable<any> {
    return this.dayList(key, operator, value).snapshotChanges()
  }

  public observeDay(id: string): Observable<any> {
    return this.subCollection.doc(id).snapshotChanges()
  }

  // Promises
  public async getDayList(): Promise<any> {
    this.loaderService.start()
    const days = await this.subCollection.get().toPromise()
    this.loaderService.stop()
    return UtilService.mapColl(days)
  }

  public async getQueryDayList(key: string, operator: any, value: any): Promise<any> {
    this.loaderService.start()
    const days = await this.dayList(key, operator, value).get().toPromise()
    this.loaderService.stop()
    return UtilService.mapColl(days)
  }

  public createDay(data: any): Promise<any> {
    this.loaderService.start()
    return this.subCollection.add(data)
      .finally(() => this.loaderService.stop())
  }

  public async readDay(id: string): Promise<any> {
    this.loaderService.start()
    const day = await this.subCollection.doc(id).get().toPromise()
    this.loaderService.stop()
    return UtilService.mapDoc(day)
  }

  public updateDay(id: string, day: any): Promise<any> {
    this.loaderService.start()
    return this.subCollection.doc(id).ref.set(day)
      .finally(() => this.loaderService.stop())
  }

  public deleteDay(id: string): Promise<any> {
    this.loaderService.start()
    return this.subCollection.doc(id).ref.delete()
      .finally(() => this.loaderService.stop())
  }

  public deleteDayBatch(days: any[]): Promise<any> {
    this.loaderService.start()
    const batch = firebase.firestore().batch()
    days.forEach((day: any) => {
      const ref = this.subCollection.doc(day.id).ref
      batch.delete(ref)
    })
    return batch.commit()
      .finally(() => this.loaderService.stop())
  }
}
