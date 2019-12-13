import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material'

import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { StudentCreationComponent } from 'src/app/classroom/students/components/student-creation/student-creation.component'
import { StudentDeleteDialogComponent } from 'src/app/classroom/components/student-delete-dialog/student-delete-dialog.component'

import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { ModelService } from 'src/app/shared/services/model.service'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject()

  studentId: any
  student: any
  mark: any = UtilService.mark
  srcImage: any = UtilService.srcImage
  academicCourseList: any = ModelService.academicCourseList
  conservatoryCourseList: any = ModelService.conservatoryCourseList
  truncate: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private dialog: MatDialog,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    // Get param id
    this.activatedRoute.params.subscribe(params => this.studentId = params.id)

    // Get student
    this.studentService.readStudent(this.studentId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        console.log(result)
        this.student = result
        this.loaderService.stop()
      })
  }

  edit() {
    this.dialog.open(StudentCreationComponent, {
      width: 'calc(100vw - 2rem)',
      maxWidth: '800px',
      data: {
        idStudent: this.studentId,
        student: this.student
      }
    })
  }

  archive() {

  }

  delete() {
    this.dialog.open(StudentDeleteDialogComponent, {
      data: {
        idStudent: this.studentId,
        student: this.student
      }
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

}
