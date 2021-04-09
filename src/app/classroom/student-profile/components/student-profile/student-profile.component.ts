import { combineLatest, Observable, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { StudentArchiveDialogComponent } from 'src/app/classroom/components/student-archive-dialog/student-archive-dialog.component'
import { StudentDeleteDialogComponent } from 'src/app/classroom/components/student-delete-dialog/student-delete-dialog.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { StudentCreationComponent } from 'src/app/classroom/students/components/student-creation/student-creation.component'
import { OrderByPipe } from 'src/app/classroom/students/pipes/order-by.pipe'
import { DIALOG_CONFIG } from 'src/app/core/core.module'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayFiltersComponent } from 'src/app/shared/components/day-filters/day-filters.component'
import { AgroupByDatePipe } from 'src/app/shared/pipes/agroup-by-date.pipe'
import { DateFilterPipe } from 'src/app/shared/pipes/date-filter.pipe'
import { ExcludeArchivedPipe } from 'src/app/shared/pipes/exclude-archived.pipe'
import { FilterByKeyPipe } from 'src/app/shared/pipes/filter-by-key.pipe'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { ModelService } from 'src/app/shared/services/model.service'
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
  router$: Subscription

  dayListFiltered: any[]
  @ViewChild(DayFiltersComponent, { static: false }) dayFilters: DayFiltersComponent

  mark: any = UtilService.mark
  academicCourseList: any = ModelService.academicCourseList
  conservatoryCourseList: any = ModelService.conservatoryCourseList

  moreInfoConfig: any = {
    show: false,
    text: 'SHOW_MORE',
    icon: 'caret-down'
  }

  selectedTab: number = 0
  tabCount: number = 2

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private dayService: DayService,
    private headerService: HeaderService,
    private cdRef: ChangeDetectorRef,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    // Observe new params
    this.router$ = this.activatedRoute.params.subscribe(params => this.loadData(params.id))
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges()
  }

  loadData(studentId: string): void {
    const student$ = this.studentService.observeStudent(studentId)
    const dayList$ = this.dayService.observeQueryDayList('studentId', '==', studentId)

    this.data$ = combineLatest([student$, dayList$]).pipe(
      tap(() => this.loaderService.load()),
      map((result) => {
        const student = UtilService.mapDocument(result[0])
        const dayList = UtilService.mapCollection(result[1])
          .map((day) => ({ ...day, hideStudent: true, student }))
        return { student, dayList }
      }),
      tap((result) => {
        this.loaderService.down()
        if (!result.student) {
          this.router.navigateByUrl(history.state.fromUrl)
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
      }, {
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

  createDay(student: any): void {
    const newDay = UtilService.clone(ModelService.dayModel)
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
    let swipeCoord
    let swipeTime
    if (when === 'start') {
      swipeCoord = coord
      swipeTime = time
    } else if (when === 'end') {
      const direction = [coord[0] - swipeCoord[0], coord[1] - swipeCoord[1]]
      const duration = time - swipeTime
      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous'
        if (swipe === 'next') {
          const isFirst = this.selectedTab === 0
          if (this.selectedTab < this.tabCount - 1) {
            this.selectedTab = isFirst ? 1 : this.selectedTab + 1
          }
        } else if (swipe === 'previous') {
          const isLast = this.selectedTab === this.tabCount - 1
          if (this.selectedTab >= 1) {
            this.selectedTab = this.selectedTab - 1
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
  }
}
