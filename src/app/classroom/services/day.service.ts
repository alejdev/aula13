import firebase from 'firebase/app'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'

export interface QueryConfig {
  path: string, //  path to collection
  field: string, // field to orderBy
  limit: number, // limit per query
  reverse: boolean, // reverse order?
  prepend: boolean // prepend to source?
}

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private subCollectionName: string = 'days'
  private _savedDayList: any[] = []
  private _query: QueryConfig = {
    path: 'days',
    field: 'date',
    limit: 10,
    reverse: true,
    prepend: false
  }

  constructor(
    private firestore: AngularFirestore,
    private loaderService: LoaderService,
    private authService: AuthService,
  ) { }

  // Collections
  private get userData(): AngularFirestoreDocument {
    return this.firestore.collection('users').doc(this.authService.userUid)
  }

  private get subCollection(): AngularFirestoreCollection {
    return this.userData.collection(this.subCollectionName)
  }

  public get savedDayList(): any[] {
    return this._savedDayList
  }

  public set savedDayList(list) {
    this._savedDayList = list
  }

  public get query(): QueryConfig {
    return this._query
  }

  public set query(query) {
    this._query = {
      ...this._query,
      ...query
    }
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
    return UtilService.mapCollection(days)
  }

  public async getQueryDayList(key: string, operator: any, value: any): Promise<any> {
    this.loaderService.start()
    const days = await this.dayList(key, operator, value).get().toPromise()
    this.loaderService.stop()
    return UtilService.mapCollection(days)
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
    return UtilService.mapDocument(day)
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

  public getCollection(cursor?: any): AngularFirestoreCollection<any> {
    return this.userData.collection(this.query.path, ref => {
      const reference = ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit)
      return cursor ? reference.startAfter(this.getCursor(cursor)) : reference
    })
  }

  // Determines the doc snapshot to paginate query
  public getCursor(data: any): any {
    if (data.length) {
      return this.query.prepend ? data[0].doc : data[data.length - 1].doc
    }
    return null
  }
}
