import { Subscription } from 'rxjs'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { ClassroomPipe } from 'src/app/classroom/students/pipes/classroom.pipe'
import { SubjectPipe } from 'src/app/classroom/students/pipes/subject.pipe'
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

  studentListFiltered: any[]
  @Input() studentList: any[]
  @Output() studentListFilter: any = new EventEmitter<any[]>()

  classroomList: any[]
  subjectList: any[]

  classroomListSubscription: Subscription
  subjectListSubscription: Subscription
  routeSubscription: Subscription

  studentFilter: string
  classroomsFilter: any[]
  subjectsFilter: any[]
  query: any

  constructor(
    private filterPipe: FilterPipe,
    private classroomPipe: ClassroomPipe,
    private subjectPipe: SubjectPipe,
    public headerService: HeaderService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.query = {}
    this.classroomListSubscription = this.classroomService.observeClassroomList()
      .subscribe((result) => this.classroomList = UtilService.mapCollection(result))
    this.subjectListSubscription = this.subjectService.observeSubjectList()
      .subscribe((result) => this.subjectList = UtilService.mapCollection(result))
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((result) => {
      this.setModels(result)
      this.filterList()
    })
  }

  filterList(list?: any[]): void {
    this.studentListFiltered = this.filterPipe.transform(list ? list : this.studentList, this.studentFilter)
    this.studentListFiltered = this.classroomPipe.transform(this.studentListFiltered, this.classroomsFilter)
    this.studentListFiltered = this.subjectPipe.transform(this.studentListFiltered, this.subjectsFilter)

    if (this.studentListFiltered) {
      this.headerService.mergeHeader({ length: this.studentListFiltered.length })
    }
    this.studentListFilter.emit(this.studentListFiltered)
  }

  setModels(params: any): void {
    this.studentFilter = params.studentFilter
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
    if (this.classroomsFilter) {
      this.query.classroomsFilter = typeof this.classroomsFilter == 'string' ? [this.classroomsFilter] : this.classroomsFilter
    }
    if (this.subjectsFilter) {
      this.query.subjectsFilter = typeof this.subjectsFilter == 'string' ? [this.subjectsFilter] : this.subjectsFilter
    }
  }

  resetFilter(): void {
    this.studentFilter = ''
    this.goToQuery()
  }

  cleanFilters(): void {
    this.studentFilter = ''
    this.classroomsFilter = []
    this.subjectsFilter = []
    this.goToQuery()
  }

  ngOnDestroy(): void {
    this.classroomListSubscription.unsubscribe()
    this.subjectListSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }
}