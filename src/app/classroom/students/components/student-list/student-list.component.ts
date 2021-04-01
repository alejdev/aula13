import { Subscription } from 'rxjs'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { StudentFiltersComponent } from 'src/app/shared/components/student-filters/student-filters.component'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'

import { AgroupByPipe } from '../../pipes/agroup-by.pipe'
import { ClassroomPipe } from '../../pipes/classroom.pipe'
import { OrderByPipe } from '../../pipes/order-by.pipe'
import { SubjectPipe } from '../../pipes/subject.pipe'
import { StudentCreationComponent } from '../student-creation/student-creation.component'

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [FilterPipe, ClassroomPipe, SubjectPipe, AgroupByPipe, OrderByPipe]
})
export class StudentListComponent implements OnInit, OnDestroy, AfterViewInit {

  studentList: any[]
  studentListFiltered: any[]
  favoriteListFiltered: any[]
  restListFiltered: any[]
  archiveListFiltered: any[]
  studentListSubscription: Subscription

  @ViewChild(StudentFiltersComponent, { static: true }) studentFilters: StudentFiltersComponent

  toggleConfig: any = {
    favorite: {
      show: true,
      text: 'FAVORITES',
      icon: 'caret-up'
    },
    rest: {
      show: true,
      text: 'STUDENTS',
      icon: 'caret-up'
    },
    archived: {
      show: false,
      text: 'ARCHIVED_STUDENTS',
      icon: 'caret-down'
    }
  }

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private headerService: HeaderService,
    private cdRef: ChangeDetectorRef,
    private agroupByPipe: AgroupByPipe,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.headerService.configHeader({ title: 'STUDENTS', search: true })
    this.loadData()
  }

  ngAfterViewInit() {
    this.loadData()
    this.cdRef.detectChanges()
  }

  loadData(): void {
    this.studentList = []
    this.loaderService.start()
    this.studentListSubscription = this.studentService.observeStudentList().subscribe(
      (result: any) => {
        this.studentList = UtilService.mapCollection(result)
        this.studentListFiltered = Object.assign(this.studentList)
        this.studentFilters.filterList(this.studentList)
      },
      (error: any) => { },
      () => { this.loaderService.stop() }
    )
  }

  createStudent(): void {
    this.dialog.open(StudentCreationComponent, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      disableClose: true,
      data: {
        student: UtilService.clone(ModelService.studenModel)
      }
    })
  }

  agroupStudents($event: Event) {
    this.favoriteListFiltered = this.agroupByPipe.transform($event, 'favorite')
    this.restListFiltered = this.agroupByPipe.transform($event)
    this.archiveListFiltered = this.agroupByPipe.transform($event, 'archived')
  }

  showMore(list: string, show?: boolean): void {
    const state = typeof show === 'undefined' ? !this.toggleConfig[list].show : show
    this.toggleConfig[list].show = state
    this.toggleConfig[list].icon = `caret-${!state ? 'down' : 'up'}`
  }

  ngOnDestroy(): void {
    this.studentListSubscription.unsubscribe()
  }
}
