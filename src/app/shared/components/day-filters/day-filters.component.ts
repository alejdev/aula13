import moment, { Moment } from 'moment'
import { Subscription } from 'rxjs'
import { HeaderService } from 'src/app/classroom/services/header.service'

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { DateFilterPipe } from '../../pipes/date-filter.pipe'
import { ExcludeArchivedPipe } from '../../pipes/exclude-archived.pipe'
import { FilterPipe } from '../../pipes/filter-by.pipe'
import { ModelService } from '../../services/model.service'
import { UtilService } from '../../services/util.service'

@Component({
  selector: 'a13-day-filters',
  templateUrl: './day-filters.component.html',
  styleUrls: ['./day-filters.component.scss']
})
export class DayFiltersComponent implements OnInit, OnDestroy {

  dayListFiltered: any[] = []
  @Input() dayList: any[]
  @Input() hideArchivedFilter: boolean
  @Output() dayListFilter: any = new EventEmitter<any[]>()

  routeSubscription: Subscription

  dayFilter: string = ''
  dateSince: Moment
  dateUntil: Moment

  quickDates: any[] = ModelService.quickDatesModel
  quickDate: any
  showArchived: boolean = false
  query: any

  constructor(
    private filterPipe: FilterPipe,
    private dateFilterPipe: DateFilterPipe,
    private excludeArchivedPipe: ExcludeArchivedPipe,
    public headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.quickDate = this.quickDates[0]
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((result) => {
      this.setModels(result)
      this.filterList()
    })
  }

  filterList(list?: any[]): void {
    this.dayListFiltered = this.filterPipe.transform(list ? list : this.dayList, this.dayFilter)
    this.dayListFiltered = this.dateFilterPipe.transform(this.dayListFiltered, this.dateSince, this.dateUntil)
    this.dayListFiltered = this.excludeArchivedPipe.transform(this.dayListFiltered, this.showArchived)

    if (this.dayListFiltered) {
      this.headerService.mergeHeader({ length: this.dayListFiltered.length })
      this.dayListFilter.emit(this.dayListFiltered)
    }
  }

  setModels(params: any): void {
    this.dayFilter = params.dayFilter
    this.showArchived = params.showArchived
    this.quickDate = this.quickDates.find(elem => elem.id == params.quickDate)
    if (this.quickDate) {
      this.dateSince = this.quickDate.since
      this.dateUntil = this.quickDate.until
    } else {
      this.dateSince = params.dateSince ? moment(params.dateSince, 'DD-MM-YYYY-H:mm:ss') : null
      this.dateUntil = params.dateUntil ? moment(params.dateUntil, 'DD-MM-YYYY-H:mm:ss') : null
    }
  }

  goToQuery() {
    this.formatQuery()
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...this.query }
    })
  }

  formatQuery(): void {
    this.query = {}
    if (this.dayFilter) { this.query.dayFilter = this.dayFilter }
    if (this.showArchived) { this.query.showArchived = this.showArchived }
    if (this.dateSince && this.dateSince.isValid()) { this.query.dateSince = this.dateSince.format('DD-MM-YYYY-H:mm:ss') }
    if (this.dateUntil && this.dateUntil.isValid()) { this.query.dateUntil = UtilService.lastMoment(this.dateUntil).format('DD-MM-YYYY-H:mm:ss') }
    if (this.quickDate) { this.query.quickDate = this.quickDate.id }
  }

  selectDate(): void {
    this.quickDate = null
    this.goToQuery()
  }

  resetFilter(): void {
    this.dayFilter = ''
    this.goToQuery()
  }

  resetDate(date: string): void {
    this[date] = null
    this.selectDate()
  }

  cleanFilters(): void {
    this.dayFilter = ''
    this.dateSince = null
    this.dateUntil = null
    this.showArchived = false
    this.quickDate = ''
    this.goToQuery()
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }

}
