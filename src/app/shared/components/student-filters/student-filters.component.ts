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

  moreInfoConfig: any = {
    show: false,
    icon: 'caret-down'
  }

  constructor(
    private filterPipe: FilterPipe,
    private classroomPipe: ClassroomPipe,
    private subjectPipe: SubjectPipe,
    private headerService: HeaderService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
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

    this.headerService.mergeHeader({ length: this.studentListFiltered.length })
    this.studentListFilter.emit(this.studentListFiltered)
  }

  setModels(params: any): void {
    this.studentFilter = params.studentFilter
    this.classroomsFilter = typeof params.classroomsFilter == 'string' ? [params.classroomsFilter] : params.classroomsFilter
    this.subjectsFilter = typeof params.subjectsFilter == 'string' ? [params.subjectsFilter] : params.subjectsFilter
  }

  goToQuery() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...this.formatParams() }
    })
  }

  formatParams(): any {
    const query: any = {}
    if (this.studentFilter) { query.studentFilter = this.studentFilter }
    if (this.classroomsFilter) {
      query.classroomsFilter = typeof this.classroomsFilter == 'string' ? [this.classroomsFilter] : this.classroomsFilter
    }
    if (this.subjectsFilter) {
      query.subjectsFilter = typeof this.subjectsFilter == 'string' ? [this.subjectsFilter] : this.subjectsFilter
    }
    return query
  }

  resetFilter(): void {
    this.studentFilter = ''
    this.goToQuery()
  }

  showMore(): void {
    const state = this.moreInfoConfig.show
    this.moreInfoConfig = {
      show: state ? false : true,
      icon: `caret-${state ? 'down' : 'up'}`
    }
  }

  ngOnDestroy(): void {
    this.classroomListSubscription.unsubscribe()
    this.subjectListSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }
}
