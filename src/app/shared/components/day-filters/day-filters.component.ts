import moment, { Moment } from 'moment'
import { HeaderService } from 'src/app/classroom/services/header.service'

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { DateFilterPipe } from '../../pipes/date-filter.pipe'
import { ExcludeArchivedPipe } from '../../pipes/exclude-archived.pipe'
import { FilterPipe } from '../../pipes/filter-by.pipe'
import { UtilService } from '../../services/util.service'

@Component({
  selector: 'a13-day-filters',
  templateUrl: './day-filters.component.html',
  styleUrls: ['./day-filters.component.scss']
})
export class DayFiltersComponent implements OnInit {

  dayListFiltered: any[]
  @Input() dayList: any[]
  @Input() hideArchivedFilter: boolean
  @Output() dayListFilter: any = new EventEmitter<any[]>()

  moreInfoConfig: any = {
    show: false,
    icon: 'caret-down'
  }

  dayFilter: string = ''
  dateSince: Moment
  dateUntil: Moment

  quickDates: any[] = [{
    name: 'DATES.ALL_TIME',
    since: null,
    until: null,
  }, {
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
  }]

  quickDate: any = this.quickDates[0]
  showArchived: boolean = false

  constructor(
    private filterPipe: FilterPipe,
    private dateFilterPipe: DateFilterPipe,
    private excludeArchivedPipe: ExcludeArchivedPipe,
    private headerService: HeaderService
  ) { }

  ngOnInit() { }

  filterList(): void {
    this.dayListFiltered = this.filterPipe.transform(this.dayList, this.dayFilter)
    this.dayListFiltered = this.dateFilterPipe.transform(this.dayListFiltered, this.dateSince, this.dateUntil)
    this.dayListFiltered = this.excludeArchivedPipe.transform(this.dayListFiltered, this.showArchived)

    this.headerService.mergeHeader({ length: this.dayListFiltered.length })
    this.dayListFilter.emit(this.dayListFiltered)
  }

  selectDate(): void {
    this.quickDate = null
    this.filterList()
  }

  selectQuickDate(): void {
    this.dateSince = this.quickDate.since
    this.dateUntil = this.quickDate.until
    this.filterList()
  }

  resetFilter(): void {
    this.dayFilter = ''
    this.filterList()
  }

  resetDate(date: string): void {
    this[date] = null
    this.selectDate()
  }

  showMore(): void {
    const state = this.moreInfoConfig.show
    this.moreInfoConfig = {
      show: state ? false : true,
      icon: `caret-${state ? 'down' : 'up'}`
    }
  }

}
