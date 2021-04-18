import firebase from 'firebase/app'
import moment from 'moment'
import { Observable } from 'rxjs'
import { Day } from 'src/app/core/interfaces'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'

export interface QueryConfig {
  path: string,
  field: string,
  limit: number,
  reverse: boolean,
  prepend: boolean
}

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private subCollectionName: string = 'days'
  private _cachedDayList: Day[] = []
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

  public get cachedDayList(): Day[] {
    return this._cachedDayList
  }

  public set cachedDayList(list: Day[]) {
    this._cachedDayList = list
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
    this.loaderService.load()
    const days = await this.subCollection.get().toPromise()
    this.loaderService.down()
    return UtilService.mapCollection(days)
  }

  public async getQueryDayList(key: string, operator: any, value: any): Promise<any> {
    this.loaderService.load()
    const days = await this.dayList(key, operator, value).get().toPromise()
    this.loaderService.down()
    return UtilService.mapCollection(days)
  }

  public createDay(data: Day): Promise<any> {
    this.loaderService.load()
    return this.subCollection.add(data)
      .finally(() => this.loaderService.down())
  }

  public async readDay(id: string): Promise<any> {
    this.loaderService.load()
    const day = await this.subCollection.doc(id).get().toPromise()
    this.loaderService.down()
    return UtilService.mapDocument(day)
  }

  public updateDay(id: string, day: Day): Promise<any> {
    this.loaderService.load()
    return this.subCollection.doc(id).ref.set(day)
      .finally(() => this.loaderService.down())
  }

  public deleteDay(id: string): Promise<any> {
    this.loaderService.load()
    return this.subCollection.doc(id).ref.delete()
      .finally(() => this.loaderService.down())
  }

  public deleteDayBatch(days: Day[]): Promise<any> {
    this.loaderService.load()
    const batch = firebase.firestore().batch()
    days.forEach((day: Day) => {
      const ref = this.subCollection.doc(day.id).ref
      batch.delete(ref)
    })
    return batch.commit()
      .finally(() => this.loaderService.down())
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

  // Normalize Day for save
  public normalizeDay(day: Day): Day {
    return {
      content: day.content.replace(/&nbsp;/g, ''),
      date: this.formatOutputDate(day.date),
      studentId: day.studentId,
      subjectId: day.subjectId || null,
      title: UtilService.capitalize(day.title),
      favorite: !!day.favorite,
      archived: !!day.archived
    }
  }

  formatInputDate(date: any): any {
    if (date) {
      return moment(new Date(date), 'DD/MM/YYYY')
    }
    return moment(UtilService.today(), 'DD/MM/YYYY')
  }

  formatOutputDate(date: any): any {
    if (date && date._isAMomentObject && date._isValid) {
      return moment(date, 'DD/MM/YYYY').unix() * 1000
    }
    return date
  }
}
