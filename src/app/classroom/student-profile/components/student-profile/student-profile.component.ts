import { Subscription } from 'rxjs'
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
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  providers: [FilterPipe, DateFilterPipe, ExcludeArchivedPipe, AgroupByDatePipe, OrderByPipe, FilterByKeyPipe]
})
export class StudentProfileComponent implements OnInit, OnDestroy, AfterViewChecked {

  studentId: any
  student: any
  dayList: any[]
  dayListFiltered: any[]

  mark: any = UtilService.mark
  academicCourseList: any = ModelService.academicCourseList
  conservatoryCourseList: any = ModelService.conservatoryCourseList
  moreInfoConfig: any = {
    show: false,
    text: 'SHOW_MORE',
    icon: 'caret-down'
  }

  routerSubscription: Subscription
  dayListSubscription: Subscription
  dayListQuerySubscription: Subscription

  swipeCoord: [number, number]
  swipeTime: number
  selectedTab: number = 0
  tabCount: number = 2

  @ViewChild(DayFiltersComponent, { static: true }) dayFilters: DayFiltersComponent
  @ViewChild('profileHeader', { static: true }) elementView: ElementRef

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private dayService: DayService,
    private headerService: HeaderService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    // Set proprofile header height
    const profileHeaderHeight = this.elementView ? this.elementView.nativeElement.offsetHeight : 190
    document.documentElement.style.setProperty('--profile-header-height', `${profileHeaderHeight}px`)
    this.loadData()
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges()
  }

  loadData() {
    // Get param id
    this.routerSubscription = this.activatedRoute.params.subscribe(params => this.studentId = params.id)

    // Observe student
    this.dayListSubscription = this.studentService.observeStudent(this.studentId)
      .subscribe((result: any) => {
        this.student = UtilService.mapDocument(result)
        this.queryDayList()

        if (this.student && this.student.personal) {
          // Config header
          this.headerService.configHeader({
            title: this.student.personal.name,
            back: true,
            student: this.student,
            truncable: true,
            menuOptions: [{
              name: 'EDIT_STUDENT',
              icon: 'pen',
              dialog: {
                component: StudentCreationComponent,
                config: {
                  ...DIALOG_CONFIG,
                  data: {
                    idStudent: this.studentId,
                    student: { ...this.student }
                  }
                }
              }
            }, {
              name: 'DUPLICATE_STUDENT',
              icon: 'copy',
              dialog: {
                component: StudentCreationComponent,
                config: {
                  ...DIALOG_CONFIG,
                  data: {
                    student: { ...this.student }
                  }
                }
              }
            }, {
              name: `${!this.student.archived ? '' : 'UN'}ARCHIVE_STUDENT`,
              icon: `box${!this.student.archived ? '' : '-open'}`,
              dialog: {
                component: StudentArchiveDialogComponent,
                config: {
                  ...DIALOG_CONFIG,
                  data: {
                    idStudent: this.studentId,
                    student: { ...this.student }
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
                    idStudent: this.studentId,
                    student: { ...this.student }
                  }
                }
              }
            }]
          })
        } else {
          this.router.navigate(['aula/alumnos'])
        }
      })
  }

  queryDayList(): void {
    this.dayListQuerySubscription = this.dayService.observeQueryDayList('studentId', '==', this.studentId)
      .subscribe((result: any) => {
        this.dayList = UtilService.mapCollection(result).map((elem) => {
          return {
            ...elem,
            hideStudent: true,
            student: { ...this.student },
          }
        })

        // Filter the list for first time
        if (this.dayFilters && this.dayList) {
          this.dayListFiltered = UtilService.clone(this.dayList)
          this.dayFilters.filterList(this.dayList)
        }
      })
  }

  createDay(): void {
    // if (this.student.archived) {
    //   this.toastService.warning({ text: 'MSG.DAY_STUDENT_ARCHIVED' })
    // } else {
    const newDay = ModelService.dayModel
    newDay.student = this.student
    this.dialog.open(DayCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        day: newDay,
      }
    })
    // }
  }

  editStudent() {
    this.dialog.open(StudentCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        idStudent: this.studentId,
        student: { ...this.student }
      }
    })
  }

  quickAction(key: string): void {
    this.student[key] = !this.student[key]
    this.studentService.updateStudent(this.studentId, this.studentService.normalizeStudent(this.student))
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
    this.routerSubscription.unsubscribe()
    this.dayListSubscription.unsubscribe()
    this.dayListQuerySubscription.unsubscribe()
  }
}
