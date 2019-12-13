import { Component, OnInit } from '@angular/core'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { DayService } from 'src/app/classroom/services/day.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { ModelService } from 'src/app/shared/services/model.service'

import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss']
})
export class DayListComponent implements OnInit {

  private ngUnsubscribe = new Subject()

  title = 'DAILY'
  dayList: any[]
  studentList: any[]

  constructor(
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private studentService: StudentService,
    private dayService: DayService
  ) { }

  ngOnInit(): void {
    this.dayList = []
    this.studentList = this.studentService.getCachedStudentList()
    if (this.studentList.length) {
      this.getDayList()
    } else {
      this.getStudentList()
    }
  }

  getDayList(): void {
    this.dayService.getDayList()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        this.dayList = result.map((elem: any) => {
          const data = elem.payload.doc.data()
          return {
            id: elem.payload.doc.id,
            student: this.studentList.find((student) => student.id === data.studentId),
            ...data,
          }
        })
        this.loaderService.stop()
      })
  }

  getStudentList(): void {
    this.studentService.getStudentList()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        this.studentList = result.map((elem: any) => {
          return {
            id: elem.payload.doc.id,
            ...elem.payload.doc.data()
          }
        })
        this.studentService.setCachedStudentList(this.studentList)
        this.getDayList()
        this.loaderService.stop()
      })
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

}
