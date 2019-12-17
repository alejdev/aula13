import { Component, OnInit, OnDestroy } from '@angular/core'

import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { ModelService } from 'src/app/shared/services/model.service'

import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss']
})
export class DayListComponent implements OnInit, OnDestroy {

  title = 'DAILY'
  dayList: any[]
  dayListSObservable: any
  studentList: any[]

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService,
    private dayService: DayService
  ) { }

  ngOnInit(): void {
    this.dayList = []
    this.studentList = this.studentService.getCachedStudentList()
    if (this.studentList.length) {
      this.getDayList()
      this.observeDayList()
    } else {
      this.getStudentList()
    }
  }

  createDay() {
    this.dialog.open(DayCreationComponent, {
      width: 'calc(100vw - 2rem)',
      maxWidth: '800px',
      data: {
        day: ModelService.dayModel
      }
    })
  }

  getDayList(): void {
    this.dayService.getDayList()
      .then((result: any) => {
        this.dayList = this.dayService.mapDayList(result, this.studentList)
      })
  }

  observeDayList(): void {
    this.dayListSObservable = this.dayService.observeDayList()
      .subscribe((result: any) => {
        this.dayList = this.dayService.mapDayList(result, this.studentList)
      })
  }

  getStudentList(): void {
    this.studentService.observeStudentList()
      .subscribe((result: any) => {
        this.studentList = this.studentService.mapStudentList(result)
        this.studentService.setCachedStudentList(this.studentList)
        this.getDayList()
        this.observeDayList()
      })
  }

  ngOnDestroy() {
    this.dayListSObservable.complete()
  }

}
