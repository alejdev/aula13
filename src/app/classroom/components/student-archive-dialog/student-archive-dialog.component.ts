import { Student } from 'src/app/core/interfaces'
import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { StudentService } from '../../services/student.service'

@Component({
  selector: 'a13-student-archive-dialog',
  templateUrl: '../templates/simple-dialog.template.html',
  styleUrls: ['./student-archive-dialog.component.scss']
})
export class StudentArchiveDialogComponent implements OnInit {

  student: Student
  textConfig: any

  constructor(
    private studentService: StudentService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<StudentArchiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.student = this.data.student
    this.textConfig = {
      title: `${!this.student.archived ? '' : 'UN'}ARCHIVE_STUDENT`,
      msg: `MSG.STUDENT_${!this.student.archived ? '' : 'UN'}ARCHIVE`,
      msg2: `MSG.STUDENT_${!this.student.archived ? '' : 'UN'}ARCHIVE_2`,
      okButton: `${!this.student.archived ? '' : 'UN'}ARCHIVE`,
      msgOk: `MSG.STUDENT_${!this.student.archived ? '' : 'UN'}ARCHIVED_OK`,
      okButtonColor: 'accent'
    }
  }

  ok(): void {
    this.student.archived = !this.student.archived
    this.studentService.updateStudent(this.data.idStudent, this.studentService.normalizeStudent(this.student))
      .then(() => {
        this.dialogRef.close(this.data.student)
        this.toastService.success({ text: this.textConfig.msgOk })
      })
      .catch((err: any) => {
        this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
      })
  }

  cancel(): void {
    this.dialogRef.close()
  }

}
