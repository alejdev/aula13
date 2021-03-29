import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { map, scan, take, tap } from 'rxjs/operators'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { ModelService } from 'src/app/shared/services/model.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { AngularFirestoreCollection } from '@angular/fire/firestore'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss']
})
export class DayListComponent implements OnInit, OnDestroy {

  dayList: any[]
  studentList: any[]

  dayListSubscription: Subscription

  private _done = new BehaviorSubject(false)
  private _loading = new BehaviorSubject(false)
  private _newData = new BehaviorSubject([])

  // Observable data
  data: Observable<any>
  done: Observable<boolean> = this._done.asObservable()
  loading: Observable<boolean> = this._loading.asObservable()

  constructor(
    private studentService: StudentService,
    private dayService: DayService,
    private dialog: MatDialog,
    private headerService: HeaderService,
  ) { }

  async ngOnInit(): Promise<any> {
    this.headerService.configHeader({ title: 'DAILY' })
    this.studentService.savedStudentList = await this.studentService.getStudentList()
    this.loadData()
  }

  private loadData(): void {
    this.dayList = []
    this.dayListSubscription = this.initPagination()
      .subscribe((result: any) => {
        this.dayList = result
        this.dayService.savedDayList = this.dayList
        this.headerService.mergeHeader({ length: this.dayList.length })
      })
  }

  // Pagination
  private initPagination() {
    this.mapAndUpdate(this.dayService.getCollection())

    // Create the observable array for consumption in components
    return this.data = this._newData.asObservable()
      .pipe(
        map((days: any) => {
          return days.map(day => {
            return {
              student: this.studentService.savedStudentList.find((student: any) => student.id === day.studentId),
              ...day
            }
          })
        }),
        // filter((day) => !day.student.archive),
        scan((acc, val) => this.dayService.query.prepend ? val.concat(acc) : acc.concat(val))
      )
  }

  // Retrieves new data
  private more() {
    this.mapAndUpdate(this.dayService.getCollection(this._newData.value))
  }

  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    // Stop scroll retrieving when done
    if (this._done.value || this._loading.value) { return }

    // Loading
    this._loading.next(true)

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .pipe(
        tap(arr => {
          let values = arr.map(snap => {
            const data = snap.payload.doc.data()
            const doc = snap.payload.doc
            const id = doc.id
            return { ...data, doc, id }
          })

          // If prepending, reverse the batch order
          values = this.dayService.query.prepend ? values.reverse() : values

          // update source with new values, done loading
          this._newData.next(values)
          this._loading.next(false)

          // no more values, mark done
          if (!values.length) {
            this._done.next(true)
          }
        }),
        take(1)
      )
      .subscribe()
  }

  createDay(): void {
    this.dialog.open(DayCreationComponent, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      data: {
        day: ModelService.dayModel
      }
    })
  }

  scrollHandler(e: any): void {
    if (e === 'bottom') {
      this.more()
    }
  }

  ngOnDestroy(): void {
    this.dayListSubscription.unsubscribe()
  }

}
