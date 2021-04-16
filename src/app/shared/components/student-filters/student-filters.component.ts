import { Subscription } from 'rxjs'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { ClassroomPipe } from 'src/app/classroom/students/pipes/classroom.pipe'
import { OrderByPipe } from 'src/app/classroom/students/pipes/order-by.pipe'
import { SubjectPipe } from 'src/app/classroom/students/pipes/subject.pipe'
import { Classroom, Student, Subject } from 'src/app/core/interfaces'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { FilterPipe } from '../../pipes/filter-by.pipe'

@Component({
  selector: 'a13-student-filters',
  templateUrl: './student-filters.component.html',
  styleUrls: ['./student-filters.component.scss']
})
export class StudentFiltersComponent implements OnInit, OnDestroy {

  studentListFiltered: Student[]
  @Input() studentList: Student[]
  @Output() studentListFilter: any = new EventEmitter<any>()

  classroomList: Classroom[]
  subjectList: Subject[]

  classroomList$: Subscription
  subjectList$: Subscription
  route$: Subscription

  showFilters: boolean

  studentFilter: string
  classroomsFilter: Classroom[]
  subjectsFilter: Subject[]
  sortBy: string = 'personal.name'
  sortDirection: string = ''
  query: any

  constructor(
    private filterPipe: FilterPipe,
    private classroomPipe: ClassroomPipe,
    private subjectPipe: SubjectPipe,
    private orderByPipe: OrderByPipe,
    public headerService: HeaderService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.query = {}
    let openFilters = false
    this.classroomList$ = this.classroomService.observeClassroomList()
      .subscribe((result) => this.classroomList = UtilService.mapCollection(result))
    this.subjectList$ = this.subjectService.observeSubjectList()
      .subscribe((result) => this.subjectList = UtilService.mapCollection(result))
    this.route$ = this.activatedRoute.queryParams.subscribe((result) => {
      openFilters = UtilService.parseStringToBoolean(result.openFilters)
      this.setModels(result)
      this.filterList()
      this.formatQuery()
      if (openFilters) { this.showFilters = Object.keys(this.query).length ? true : false }
    })
  }

  filterList(list?: Student[]): void {
    this.studentListFiltered = list ? list : this.studentList
    if (this.studentFilter) { this.studentListFiltered = this.filterPipe.transform(this.studentListFiltered, this.studentFilter) }
    if (this.classroomsFilter) { this.studentListFiltered = this.classroomPipe.transform(this.studentListFiltered, this.classroomsFilter) }
    if (this.subjectsFilter) { this.studentListFiltered = this.subjectPipe.transform(this.studentListFiltered, this.subjectsFilter) }
    this.studentListFiltered = this.orderByPipe.transform(this.studentListFiltered, `${this.sortDirection === 'reversed' ? '-' : ''}${this.sortBy}`)

    if (this.studentListFiltered) {
      this.headerService.mergeHeader({ length: this.studentListFiltered.length })
    }
    this.studentListFilter.emit(this.studentListFiltered)
  }

  setModels(params: any): void {
    this.studentFilter = params.studentFilter
    this.sortDirection = params.sortDirection
    this.classroomsFilter = typeof params.classroomsFilter == 'string' ? [params.classroomsFilter] : params.classroomsFilter
    this.subjectsFilter = typeof params.subjectsFilter == 'string' ? [params.subjectsFilter] : params.subjectsFilter
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
    if (this.studentFilter) { this.query.studentFilter = this.studentFilter }
    if (this.sortDirection === 'reversed') { this.query.sortDirection = this.sortDirection }
    if (this.classroomsFilter) {
      this.query.classroomsFilter = typeof this.classroomsFilter == 'string' ? [this.classroomsFilter] : this.classroomsFilter
    }
    if (this.subjectsFilter) {
      this.query.subjectsFilter = typeof this.subjectsFilter == 'string' ? [this.subjectsFilter] : this.subjectsFilter
    }
  }

  sort(): any {
    this.sortDirection = this.sortDirection ? '' : 'reversed'
    this.goToQuery()
  }

  resetFilter(): void {
    this.studentFilter = ''
    this.goToQuery()
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters
  }

  cleanFilters(): void {
    this.studentFilter = ''
    this.sortDirection = ''
    this.classroomsFilter = []
    this.subjectsFilter = []
    this.goToQuery()
  }

  ngOnDestroy(): void {
    this.classroomList$.unsubscribe()
    this.subjectList$.unsubscribe()
    this.route$.unsubscribe()
  }
}
