import moment, { Moment } from 'moment'
import { Subscription } from 'rxjs'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { OrderByPipe } from 'src/app/classroom/students/pipes/order-by.pipe'

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { AgroupByDatePipe } from '../../pipes/agroup-by-date.pipe'
import { DateFilterPipe } from '../../pipes/date-filter.pipe'
import { FilterByKeyPipe } from '../../pipes/filter-by-key.pipe'
import { FilterPipe } from '../../pipes/filter-by.pipe'
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

  showFilters: boolean

  dayFilter: string = ''
  dateSince: Moment
  dateUntil: Moment

  quickDates: any[] = this.getQuickDatesModel(moment())
  quickDate: any
  showFavorites: boolean = false
  showArchived: boolean = false
  sortBy: string = 'date'
  sortDirection: string = 'reversed'
  query: any

  constructor(
    private filterPipe: FilterPipe,
    private dateFilterPipe: DateFilterPipe,
    private agroupByDatePipe: AgroupByDatePipe,
    private orderByPipe: OrderByPipe,
    private filterByKeyPipe: FilterByKeyPipe,
    public headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.query = {}
    let firstTime = true
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((result) => {
      this.setModels(result)
      this.filterList()
      this.formatQuery()
      if (firstTime) { this.showFilters = Object.keys(this.query).length ? true : false }
      firstTime = false
    })
  }

  filterList(list?: any[]): void {
    this.dayListFiltered = list ? list : this.dayList

    if (this.dayFilter) { this.dayListFiltered = this.filterPipe.transform(this.dayListFiltered, this.dayFilter) }
    if (this.dateSince || this.dateUntil) { this.dayListFiltered = this.dateFilterPipe.transform(this.dayListFiltered, this.dateSince, this.dateUntil) }
    this.filterFavsAndArchived()
    this.dayListFiltered = this.orderByPipe.transform(this.dayListFiltered, `${this.sortDirection === 'reversed' ? '' : '-'}${this.sortBy}`)
    this.dayListFiltered = this.agroupByDatePipe.transform(this.dayListFiltered)

    if (this.dayListFiltered) {
      this.headerService.mergeHeader({ length: this.dayListFiltered.length })
      this.dayListFilter.emit(this.dayListFiltered)
    }
  }

  filterFavsAndArchived() {
    switch (true) {
      case !this.showFavorites && !this.showArchived:
        this.configFavsAndArchived({})
        break
      case this.showFavorites && !this.showArchived:
        this.configFavsAndArchived({ favorite: this.showFavorites })
        break
      case !this.showFavorites && this.showArchived:
        this.configFavsAndArchived({}, true)
        break
      case this.showFavorites && this.showArchived:
        this.configFavsAndArchived({ favorite: this.showFavorites }, true)
        break
    }
  }

  configFavsAndArchived(config: any, inclusive?: boolean) {
    let filters = { archived: this.showArchived, ...config }
    filters = this.isStudentProfile() ? { ...filters, ...config } : { ...filters, ...config, 'student.archived': this.showArchived }
    this.filterBy(filters, inclusive)
  }

  filterBy(config: any, inclusive?: boolean) {
    this.dayListFiltered = this.filterByKeyPipe.transform(this.dayListFiltered, config, inclusive)
  }

  isStudentProfile() {
    return this.dayListFiltered && this.dayListFiltered[0] && this.dayListFiltered[0].hideStudent ? true : false
  }

  setModels(params: any): void {
    this.dayFilter = params.dayFilter
    this.showArchived = UtilService.parseStringToBoolean(params.showArchived) ? true : false
    this.showFavorites = UtilService.parseStringToBoolean(params.showFavorites) ? true : false
    this.sortDirection = params.sortDirection
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
    if (this.showArchived === true) { this.query.showArchived = this.showArchived }
    if (this.showFavorites === true) { this.query.showFavorites = this.showFavorites }
    if (this.sortDirection === 'reversed') { this.query.sortDirection = this.sortDirection }
    if (this.quickDate) { this.query.quickDate = this.quickDate.id }
    if (this.dateSince && this.dateSince.isValid()) { this.query.dateSince = this.dateSince.format('DD-MM-YYYY-H:mm:ss') }
    if (this.dateUntil && this.dateUntil.isValid()) { this.query.dateUntil = UtilService.lastMoment(this.dateUntil).format('DD-MM-YYYY-H:mm:ss') }
  }

  sort(): any {
    this.sortDirection = !this.sortDirection ? 'reversed' : ''
    this.goToQuery()
  }

  toggle(param: string): any {
    this[param] = !this[param]
    this.goToQuery()
  }

  selectDate(): void {
    this.quickDate = null
    this.goToQuery()
  }

  selectQuickDate(): void {
    this.dateSince = this.quickDate.since
    this.dateUntil = this.quickDate.until
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
    this.showFavorites = false
    this.quickDate = ''
    this.sortDirection = ''
    this.goToQuery()
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters
  }

  getQuickDatesModel(today: Moment): any[] {
    return [{
      id: 'allTime',
      name: 'DATES.ALL_TIME',
      since: null,
      until: null,
    }, {
      id: 'today',
      name: 'DATES.TODAY',
      since: UtilService.firstMoment(moment(today)),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'yesterday',
      name: 'DATES.YESTERDAY',
      since: UtilService.firstMoment(moment(today).subtract(1, 'days')),
      until: UtilService.lastMoment(moment(today).subtract(1, 'days')),
    }, {
      id: 'beforeYesterday',
      name: 'DATES.BEFORE_YESTERDAY',
      since: UtilService.firstMoment(moment(today).subtract(2, 'days')),
      until: UtilService.lastMoment(moment(today).subtract(2, 'days')),
    }, {
      id: 'lastWeek',
      name: 'DATES.LAST_WEEK',
      since: UtilService.firstMoment(moment(today).subtract(6, 'days')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'thisWeek',
      name: 'DATES.THIS_WEEK',
      since: moment(today).clone().startOf('isoWeek'),
      until: moment(today).clone().endOf('isoWeek'),
    }, {
      id: 'pastWeek',
      name: 'DATES.PAST_WEEK',
      since: moment(today).clone().startOf('isoWeek').subtract(1, 'week'),
      until: moment(today).clone().endOf('isoWeek').subtract(1, 'week'),
    }, {
      id: 'last15Days',
      name: 'DATES.LAST_15DAYS',
      since: UtilService.firstMoment(moment(today).subtract(14, 'days')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'lastMonth',
      name: 'DATES.LAST_MONTH',
      since: UtilService.firstMoment(moment(today).subtract(29, 'days')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'thisMonth',
      name: 'DATES.THIS_MONTH',
      since: moment(today).clone().startOf('month'),
      until: moment(today).clone().endOf('month'),
    }, {
      id: 'pastMonth',
      name: 'DATES.PAST_MONTH',
      since: moment(today).clone().startOf('month').subtract(1, 'month'),
      until: moment(today).clone().endOf('month').subtract(1, 'month'),
    }, {
      id: 'last3Month',
      name: 'DATES.LAST_3MONTH',
      since: UtilService.firstMoment(moment(today).subtract(3, 'months')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'last6Month',
      name: 'DATES.LAST_6MONTH',
      since: UtilService.firstMoment(moment(today).subtract(6, 'months')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'lastYear',
      name: 'DATES.LAST_YEAR',
      since: UtilService.firstMoment(moment(today).subtract(1, 'years')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'thisYear',
      name: 'DATES.THIS_YEAR',
      since: moment(today).clone().startOf('year'),
      until: moment(today).clone().endOf('year'),
    }, {
      id: 'pastYear',
      name: 'DATES.PAST_YEAR',
      since: moment(today).clone().startOf('year').subtract(1, 'year'),
      until: moment(today).clone().endOf('year').subtract(1, 'year'),
    }]
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }

}
