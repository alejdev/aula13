import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { StudentCreationComponent } from 'src/app/classroom/students/components/student-creation/student-creation.component'
import { StudentDeleteDialogComponent } from 'src/app/classroom/components/student-delete-dialog/student-delete-dialog.component'

import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { DayService } from 'src/app/classroom/services/day.service'
import { StudentArchiveDialogComponent } from 'src/app/classroom/components/student-archive-dialog/student-archive-dialog.component'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {

  studentId: any
  student: any
  studentObservable: any
  dayList: any[]
  dayListSObservable: any
  mark: any = UtilService.mark
  srcImage: any = UtilService.srcImage
  academicCourseList: any = ModelService.academicCourseList
  conservatoryCourseList: any = ModelService.conservatoryCourseList
  moreInfoConfig: any = {
    show: false,
    text: 'SHOW_MORE',
    icon: 'caret-down'
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private dayService: DayService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {

    // Get param id
    this.activatedRoute.params.subscribe(params => this.studentId = params.id)

    // Get student
    this.studentService.readStudent(this.studentId)
      .then((result: any) => {
        this.student = this.studentService.mapStudent(result)
      })

    // Observe student
    this.studentObservable = this.studentService.observeStudent(this.studentId)
      .subscribe((result: any) => {
        this.student = this.studentService.mapStudent(result)
        console.log(this.student)

        this.getDayList()
        this.observeDayList()

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

  getDayList(): void {
    this.dayService.getDayList()
      .then((result: any) => {
        this.dayList = this.dayService.mapDayList(result, [])
      })
  }

  observeDayList(): void {
    this.dayListSObservable = this.dayService.observeDayList()
      .subscribe((result: any) => {
        this.dayList = this.dayService.mapDayList(result, [])
      })
  }

  ngOnDestroy(): void {
    this.studentObservable.complete()
  }
}
