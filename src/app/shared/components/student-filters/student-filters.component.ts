import { Subscription } from 'rxjs'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { ClassroomPipe } from 'src/app/classroom/students/pipes/classroom.pipe'
import { SubjectPipe } from 'src/app/classroom/students/pipes/subject.pipe'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

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

  moreInfoConfig: any = {
    show: false,
    icon: 'caret-down'
  }

  studentFilter: string = ''
  classroomsFilter: any[] = []
  subjectsFilter: any[] = []
  showArchived: boolean = false

  constructor(
    private filterPipe: FilterPipe,
    private classroomPipe: ClassroomPipe,
    private subjectPipe: SubjectPipe,
    private headerService: HeaderService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
  ) { }

  ngOnInit() {
    this.classroomListSubscription = this.classroomService.observeClassroomList()
      .subscribe((result) => this.classroomList = UtilService.mapCollection(result))
    this.subjectListSubscription = this.subjectService.observeSubjectList()
      .subscribe((result) => this.subjectList = UtilService.mapCollection(result))
  }

  filterList(): void {
    this.studentListFiltered = this.filterPipe.transform(this.studentList, this.studentFilter)
    this.studentListFiltered = this.classroomPipe.transform(this.studentListFiltered, this.classroomsFilter)
    this.studentListFiltered = this.subjectPipe.transform(this.studentListFiltered, this.subjectsFilter)

    this.headerService.mergeHeader({ length: this.studentListFiltered.length })
    this.studentListFilter.emit(this.studentListFiltered)
  }

  resetFilter(): void {
    this.studentFilter = ''
    this.filterList()
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
  }
}
