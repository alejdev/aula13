import { Subscription } from 'rxjs'
import { StudentArchiveDialogComponent } from 'src/app/classroom/components/student-archive-dialog/student-archive-dialog.component'
import { StudentDeleteDialogComponent } from 'src/app/classroom/components/student-delete-dialog/student-delete-dialog.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { StudentCreationComponent } from 'src/app/classroom/students/components/student-creation/student-creation.component'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DateFilterPipe } from 'src/app/shared/pipes/date-filter.pipe'
import { FilterPipe } from 'src/app/shared/pipes/student.pipe'
import { ModelService } from 'src/app/shared/services/model.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  providers: [FilterPipe, DateFilterPipe]
})
export class StudentProfileComponent implements OnInit, OnDestroy {

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

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private dayService: DayService,
    private headerService: HeaderService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    // Get param id
    this.routerSubscription = this.activatedRoute.params.subscribe(params => this.studentId = params.id)

    // Get student
    this.getStudent(this.studentId)

    // Observe student
    this.dayListSubscription = this.studentService.observeStudent(this.studentId)
      .subscribe((result: any) => {
        this.student = UtilService.mapDocument(result)
        this.queryDayList()

        if (this.student && this.student.personal) {
          // Config header
          this.headerService.configHeader({
            title: this.student.personal.name,
            back: '/aula/alumnos',
            student: this.student,
            truncable: true,
            menuOptions: [{
              name: 'EDIT_STUDENT',
              icon: 'pen',
              dialog: {
                component: StudentCreationComponent,
                config: {
                  width: 'calc(100vw)',
                  maxWidth: '800px',
                  autoFocus: false,
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
                  width: 'calc(100vw)',
                  maxWidth: '800px',
                  autoFocus: false,
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
                  autoFocus: false,
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
                  autoFocus: false,
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

  async getStudent(id: string): Promise<any> {
    this.student = await this.studentService.readStudent(id)
  }

  showMore() {
    const state = this.moreInfoConfig.show
    this.moreInfoConfig = {
      show: state ? false : true,
      text: `SHOW_${state ? 'MORE' : 'LESS'}`,
      icon: `caret-${state ? 'down' : 'up'}`
    }
  }

  fav(): void {
    this.student.favorite = !this.student.favorite
    this.studentService.updateStudent(this.student.id, this.student)
  }

  queryDayList(): void {
    this.dayListQuerySubscription = this.dayService.observeQueryDayList('studentId', '==', this.studentId)
      .subscribe((result: any) => {
        this.dayList = UtilService.mapCollection(result).map((elem) => {
          return {
            ...elem,
            hideStudent: true,
            student: { ...this.student }
          }
        })
        this.dayListFiltered = Object.assign(this.dayList)
        this.headerService.mergeHeader({ length: this.dayListFiltered.length })
      })
  }

  createDay(): void {
    if (this.student.archived) {
      this.toastService.warning({ text: 'MSG.DAY_STUDENT_ARCHIVED' })
    } else {
      const newDay = ModelService.dayModel
      newDay.student = this.student
      this.dialog.open(DayCreationComponent, {
        width: 'calc(100vw)',
        maxWidth: '800px',
        autoFocus: false,
        disableClose: true,
        data: {
          day: newDay,
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe()
    this.dayListSubscription.unsubscribe()
    this.dayListQuerySubscription.unsubscribe()
  }
}
