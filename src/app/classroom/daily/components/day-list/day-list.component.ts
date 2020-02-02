import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { UtilService } from 'src/app/shared/services/util.service'

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

  async getDayList(): Promise<any> {
    const dayList = await this.dayService.getDayList()
    this.dayList = dayList.map((day: any) => this.mapDayList(day))
  }

  observeDayList(): void {
    this.dayListSubscription = this.dayService.observeDayList()
      .subscribe((result: any) => {
        this.dayList = UtilService.mapColl(result).map((day) => this.mapDayList(day))
      })
  }

  mapDayList(day: any): any {
    return {
      student: this.studentList.find((student: any) => student.id === day.studentId),
      ...day
    }
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

  ngOnDestroy(): void {
    this.dayListSubscription.unsubscribe()
  }

}
