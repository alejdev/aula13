import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { StudentCreationComponent } from 'src/app/classroom/students/components/student-creation/student-creation.component'
import { StudentDeleteDialogComponent } from 'src/app/classroom/components/student-delete-dialog/student-delete-dialog.component'

import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { HeaderService } from 'src/app/classroom/services/header.service'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {

  studentId: any
  student: any
  studentObservable: any
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
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
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

        // Config header
        this.headerService.configHeader({
          title: this.student.name,
          back: '/aula/alumnos',
          student: this.student,
          truncable: true,
          menuOptions: [{
            name: 'EDIT_STUDENT',
            icon: 'pen',
            dialog: {
              component: StudentCreationComponent,
              config: {
                width: 'calc(100vw - 2rem)',
                maxWidth: '800px',
                autoFocus: false,
                data: {
                  idStudent: this.studentId,
                  student: { ...this.student }
                }
              }
            }
          }, {
            name: 'ARCHIVE_STUDENT',
            icon: 'archive',
            dialog: {}
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
      })
  }

  showMore() {
    if (this.moreInfoConfig.show) {
      this.moreInfoConfig = {
        show: false,
        text: 'SHOW_MORE',
        icon: 'caret-down'
      }
    } else {
      this.moreInfoConfig = {
        show: true,
        text: 'SHOW_LESS',
        icon: 'caret-up'
      }
    }
  }

  ngOnDestroy(): void {
    this.studentObservable.complete()
  }

}
