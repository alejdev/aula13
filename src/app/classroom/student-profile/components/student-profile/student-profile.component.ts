import { combineLatest, Observable, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { StudentArchiveDialogComponent } from 'src/app/classroom/components/student-archive-dialog/student-archive-dialog.component'
import { StudentDeleteDialogComponent } from 'src/app/classroom/components/student-delete-dialog/student-delete-dialog.component'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { StudentCreationComponent } from 'src/app/classroom/students/components/student-creation/student-creation.component'
import { OrderByPipe } from 'src/app/classroom/students/pipes/order-by.pipe'
import { DAY_MODEL } from 'src/app/core/models'
import { ACADEMIC_COURSE_LIST, CONSERVATORY_COURSE_LIST, DIALOG_CONFIG, SKELETON_CONFIG } from 'src/app/core/settings'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayFiltersComponent } from 'src/app/shared/components/day-filters/day-filters.component'
import { AgroupByDatePipe } from 'src/app/shared/pipes/agroup-by-date.pipe'
import { DateFilterPipe } from 'src/app/shared/pipes/date-filter.pipe'
import { ExcludeArchivedPipe } from 'src/app/shared/pipes/exclude-archived.pipe'
import { FilterByKeyPipe } from 'src/app/shared/pipes/filter-by-key.pipe'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  providers: [FilterPipe, DateFilterPipe, ExcludeArchivedPipe, AgroupByDatePipe, OrderByPipe, FilterByKeyPipe]
})
export class StudentProfileComponent implements OnInit, OnDestroy, AfterViewChecked {

  data$: Observable<any>
  badges$: Subscription
  router$: Subscription

  student: any
  dayList: any
  dayListFiltered: any[]
  @ViewChild(DayFiltersComponent, { static: false }) dayFilters: DayFiltersComponent

  mark: any = UtilService.mark
  academicCourseList: any = ACADEMIC_COURSE_LIST
  conservatoryCourseList: any = CONSERVATORY_COURSE_LIST

  selectedTab: number = 0
  tabCount: number = 2
  swipeCoord: [number, number]
  swipeTime: number

  skeleton: any = SKELETON_CONFIG
  moreInfoConfig: any = {
    show: false,
    text: 'SHOW_MORE',
    icon: 'caret-down'
  }

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private dayService: DayService,
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private headerService: HeaderService,
    private cdRef: ChangeDetectorRef,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    // Observe new params
    this.loadBadges()
    this.router$ = this.activatedRoute.params.subscribe(params => this.loadData(params.id))
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges()
  }

  loadBadges(): void {
    const classroomList$ = this.classroomService.observeClassroomList()
    const subjectList$ = this.subjectService.observeSubjectList()

    this.badges$ = combineLatest([classroomList$, subjectList$]).pipe(
      map((result) => ({
        classroomList: UtilService.mapCollection(result[0]),
        subjectList: UtilService.mapCollection(result[1])
      }))
    ).subscribe((result) => {
      this.classroomService.cachedClassrooms = result.classroomList
      this.subjectService.cachedSubjects = result.subjectList
    })
  }

  loadData(studentId: string): void {
    const student$ = this.studentService.observeStudent(studentId)
    const dayList$ = this.dayService.observeQueryDayList('studentId', '==', studentId)

    this.data$ = combineLatest([student$, dayList$]).pipe(
      tap(() => this.loaderService.load()),
      map((result) => {
        this.student = UtilService.mapDocument(result[0])
        this.dayList = UtilService.mapCollection(result[1])
          .map((day) => ({ ...day, hideStudent: true, student: this.student }))
        return { student: this.student, dayList: this.dayList }
      }),
      tap((result) => {
        this.loaderService.down()
        if (!result.student) {
          this.router.navigateByUrl(history.state.fromUrl ? history.state.fromUrl : 'classroom/students')
          return
        }
        this.configHeader(result.student)
        if (this.dayFilters && result.dayList) {
          this.dayListFiltered = UtilService.clone(result.dayList)
          this.dayFilters.filterList(result.dayList)
        }
      })
    )
  }

  configHeader(student: any): void {
    this.headerService.configHeader({
      title: student.personal.name,
      back: true,
      student,
      truncable: true,
      menuOptions: [{
        name: 'EDIT_STUDENT',
        icon: 'pen',
        dialog: {
          component: StudentCreationComponent,
          config: {
            ...DIALOG_CONFIG,
            data: {
              idStudent: student.id,
              student: { ...student }
            }
          }
        }
      }, {
        name: 'CLONE_STUDENT',
        icon: 'copy',
        dialog: {
          component: StudentCreationComponent,
          config: {
            ...DIALOG_CONFIG,
            data: {
              student: { ...student },
              isClone: true
            }
          }
        }
      }, {
        name: `${!student.archived ? '' : 'UN'}ARCHIVE_STUDENT`,
        icon: `box${!student.archived ? '' : '-open'}`,
        dialog: {
          component: StudentArchiveDialogComponent,
          config: {
            ...DIALOG_CONFIG,
            data: {
              idStudent: student.id,
              student: { ...student }
            }
          }
        }
      },
      { divider: true },
      {
        name: 'STUDENT_DELETE',
        icon: 'trash',
        dialog: {
          component: StudentDeleteDialogComponent,
          config: {
            ...DIALOG_CONFIG,
            data: {
              idStudent: student.id,
              student: { ...student }
            }
          }
        }
      }]
    })
  }

  tapToEdit(student: any): void {
    this.dialog.open(StudentCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        idStudent: student.id,
        student: { ...student }
      }
    })
  }

  createDay(student: any): void {
    const newDay = UtilService.clone(DAY_MODEL)
    newDay.student = student
    this.dialog.open(DayCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        day: newDay,
      }
    })
  }

  quickAction(student: any, key: string): void {
    student[key] = !student[key]
    this.studentService.updateStudent(student.id, this.studentService.normalizeStudent(student))
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
    const time = new Date().getTime()
    if (when === 'start') {
      this.swipeCoord = coord
      this.swipeTime = time
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]]
      const duration = time - this.swipeTime
      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous'
        if (swipe === 'next') {
          const isFirst = this.selectedTab === 0
          if (this.selectedTab < this.tabCount - 1) {
            this.selectedTab = isFirst ? 1 : this.selectedTab + 1
            e.stopPropagation()
          }
        } else if (swipe === 'previous') {
          // const isLast = this.selectedTab === this.tabCount - 1
          if (this.selectedTab >= 1) {
            this.selectedTab = this.selectedTab - 1
            e.stopPropagation()
          }
        }
      }
    }
  }

  showMore() {
    const state = this.moreInfoConfig.show
    this.moreInfoConfig = {
      show: state ? false : true,
      text: `SHOW_${state ? 'MORE' : 'LESS'}`,
      icon: `caret-${state ? 'down' : 'up'}`
    }
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe()
    this.badges$.unsubscribe()
  }
}
