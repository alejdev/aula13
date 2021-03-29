import { Subscription } from 'rxjs'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { FilterPipe } from 'src/app/shared/pipes/student.pipe'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss'],
  providers: [FilterPipe]
})
export class DayListComponent implements OnInit, OnDestroy {

  dayList: any[]
  studentList: any[]

  dayListSubscription: Subscription

  // Filters
  dayFilter: string = ''
  dayListFiltered: any[]

  constructor(
    private studentService: StudentService,
    private filterPipe: FilterPipe,
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
    this.dayListSubscription = this.dayService.observeDayList().subscribe((result) => {
      this.dayList = UtilService.mapCollection(result).map((day: any) => {
        return {
          student: this.studentService.savedStudentList.find((student: any) => student.id === day.studentId),
          ...day
        }
      })
      this.assignList()
    })
  }

  searchDay(query: string): void {
    this.dayListFiltered = this.filterPipe.transform(this.dayList, query)
    this.headerService.mergeHeader({ length: this.dayListFiltered.length })
  }

  resetFilter(): void {
    this.dayFilter = ''
    this.assignList()
  }

  assignList() {
    this.dayListFiltered = Object.assign(this.dayList)
    this.headerService.mergeHeader({ length: this.dayListFiltered.length })
  }

  createDay(): void {
    this.dialog.open(DayCreationComponent, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      disableClose: true,
      data: {
        day: ModelService.dayModel
      }
    })
  }

  ngOnDestroy(): void {
    this.dayListSubscription.unsubscribe()
  }

}
