import _moment, { default as _rollupMoment, Moment } from 'moment'
import { Subscription } from 'rxjs'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DateFilterPipe } from 'src/app/shared/pipes/date-filter.pipe'
import { FilterPipe } from 'src/app/shared/pipes/student.pipe'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'

const moment = _rollupMoment || _moment

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss'],
  providers: [FilterPipe, DateFilterPipe]
})
export class DayListComponent implements OnInit, OnDestroy {

  moreInfoConfig: any = {
    show: false,
    icon: 'caret-down'
  }

  dayList: any[]
  studentList: any[]

  dayListSubscription: Subscription

  // Filters
  showArchived: boolean
  dayFilter: string = ''
  dayListFiltered: any[]
  dayListFilteredAux: any[]
  dateSince: Moment
  dateUntil: Moment

  quickDates: any[] = [{
    name: 'DATES.TODAY',
    since: UtilService.firstMoment(moment()),
    until: UtilService.lastMoment(moment()),
  }, {
    name: 'DATES.YESTERDAY',
    since: UtilService.firstMoment(moment().subtract(1, 'days')),
    until: UtilService.lastMoment(moment().subtract(1, 'days')),
  }, {
    name: 'DATES.LAST_WEEK',
    since: UtilService.firstMoment(moment().subtract(6, 'days')),
    until: UtilService.lastMoment(moment()),
  }, {
    name: 'DATES.THIS_WEEK',
    since: moment().clone().startOf('isoWeek'),
    until: moment().clone().endOf('isoWeek'),
  }, {
    name: 'DATES.LAST_15DAYS',
    since: UtilService.firstMoment(moment().subtract(14, 'days')),
    until: UtilService.lastMoment(moment()),
  }, {
    name: 'DATES.LAST_MONTH',
    since: UtilService.firstMoment(moment().subtract(29, 'days')),
    until: UtilService.lastMoment(moment()),
  }, {
    name: 'DATES.THIS_MONTH',
    since: moment().clone().startOf('month'),
    until: moment().clone().endOf('month'),
  }, {
    name: 'DATES.LAST_3MONTH',
    since: UtilService.firstMoment(moment().subtract(3, 'months')),
    until: UtilService.lastMoment(moment()),
  }, {
    name: 'DATES.LAST_6MONTH',
    since: UtilService.firstMoment(moment().subtract(6, 'months')),
    until: UtilService.lastMoment(moment()),
  }, {
    name: 'DATES.LAST_YEAR',
    since: UtilService.firstMoment(moment().subtract(1, 'years')),
    until: UtilService.lastMoment(moment()),
  }, {
    name: 'DATES.THIS_YEAR',
    since: moment().clone().startOf('year'),
    until: moment().clone().endOf('year'),
  }, {
    name: 'DATES.ALL_TIME',
    since: null,
    until: null,
  }]

  quickDate: any = this.quickDates[this.quickDates.length - 1]

  constructor(
    private studentService: StudentService,
    private filterPipe: FilterPipe,
    private dateFilterPipe: DateFilterPipe,
    private dayService: DayService,
    private dialog: MatDialog,
    private headerService: HeaderService
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
      this.filterList()
    })
  }

  filterList(): void {
    this.dayListFiltered = this.filterPipe.transform(this.dayList, this.dayFilter)
    this.dayListFiltered = this.dateFilterPipe.transform(this.dayListFiltered, this.dateSince, this.dateUntil).filter((elem) => !elem.student.archived || elem.student.archived == this.showArchived)
    this.headerService.mergeHeader({ length: this.dayListFiltered.length })
  }

  selectQuickDate() {
    this.dateSince = this.quickDate.since
    this.dateUntil = this.quickDate.until
    this.filterList()
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

  showMore() {
    const state = this.moreInfoConfig.show
    this.moreInfoConfig = {
      show: state ? false : true,
      icon: `caret-${state ? 'down' : 'up'}`
    }
  }

  ngOnDestroy(): void {
    this.dayListSubscription.unsubscribe()
  }

}
