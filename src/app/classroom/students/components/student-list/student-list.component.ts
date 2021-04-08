import { Subscription } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { DIALOG_CONFIG } from 'src/app/core/core.module'
import { StudentFiltersComponent } from 'src/app/shared/components/student-filters/student-filters.component'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

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
export class StudentListComponent implements OnInit, OnDestroy, AfterViewChecked {

  studentList: any[]
  studentListFiltered: any[]
  favoriteListFiltered: any[]
  restListFiltered: any[]
  archiveListFiltered: any[]

  studentListSubscription$: Subscription

  @ViewChild(StudentFiltersComponent, { static: false }) studentFilters: StudentFiltersComponent

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
    private agroupByPipe: AgroupByPipe,
    private cdRef: ChangeDetectorRef,
    public router: Router,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.headerService.configHeader({ title: 'STUDENTS', showLogo: true })
    this.loadData()
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges()
  }

  loadData(): void {
    const studentList$ = this.studentService.observeStudentList()
    const subjectList$ = this.subjectService.observeSubjectList()

    this.studentListSubscription$ = subjectList$.pipe(
      map((subjectList) => UtilService.mapCollection(subjectList)),
      switchMap((subjectList) => {
        return studentList$.pipe(map((studentList) => {
          studentList = UtilService.mapCollection(studentList).map((student) => ({
            ...student,
            subjects: subjectList.filter((subject) => student.classroom.subjects.includes(subject.id))
          }))
          return studentList
        }))
      })
    ).subscribe((result: any) => {
      this.studentList = result
      this.studentListFiltered = UtilService.clone(this.studentList)

      // Filter the list for first time
      if (this.studentFilters && this.studentList.length) {
        this.studentFilters.filterList(this.studentList)
      }
    })
  }

  createStudent(): void {
    this.dialog.open(StudentCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        student: UtilService.clone(ModelService.studenModel)
      }
    })
  }

  agroupStudents($event: any): void {
    this.studentListFiltered = $event
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
    this.studentListSubscription$.unsubscribe()
  }
}
