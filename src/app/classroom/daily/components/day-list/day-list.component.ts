import { Component, OnInit, OnDestroy } from '@angular/core'

import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { HeaderService } from 'src/app/classroom/services/header.service'

import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss']
})
export class DayListComponent implements OnInit, OnDestroy {

  dayList: any[]
  dayListObservable: any
  studentList: any[]

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService,
    private dayService: DayService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    // Config header
    this.headerService.configHeader({ title: 'DAILY' })

    this.getData()
  }

  async getData(): Promise<any> {
    this.dayList = []
    this.studentList = await this.studentService.getStudentList()
    this.getDayList()
    this.observeDayList()
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

  getDayList(): void {
    this.dayService.getDayList()
      .then((result: any) => {
        this.dayList = this.dayService.mapDayList(result, this.studentList)
      })
  }

  observeDayList(): void {
    this.dayListObservable = this.dayService.observeDayList()
      .subscribe((result: any) => {
        this.dayList = this.dayService.mapDayList(result, this.studentList)
      })
  }

  async getStudentList(): Promise<any> {
  }

  ngOnDestroy(): void {
    this.dayListObservable.complete()
  }

}
