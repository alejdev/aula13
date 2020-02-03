import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { StudentCreationComponent } from 'src/app/classroom/students/components/student-creation/student-creation.component'
import { StudentDeleteDialogComponent } from 'src/app/classroom/components/student-delete-dialog/student-delete-dialog.component'
import { StudentArchiveDialogComponent } from 'src/app/classroom/components/student-archive-dialog/student-archive-dialog.component'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'

import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { DayService } from 'src/app/classroom/services/day.service'

import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {

  studentId: any
  student: any
  dayList: any[]

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
        this.dayList = UtilService.mapCollection(result)
      })
  }

  createDay(): void {
    if (this.student.archived) {
      this.toastService.warning('MSG.DAY_STUDENT_ARCHIVED')
    } else {
      const newDay = ModelService.dayModel
      newDay.student = this.student
      this.dialog.open(DayCreationComponent, {
        width: 'calc(100vw)',
        maxWidth: '800px',
        autoFocus: false,
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
