import { Component, OnInit, Inject } from '@angular/core'
import { Router } from '@angular/router'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { StudentService } from '../../services/student.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
  selector: 'a13-student-archive-dialog',
  templateUrl: './student-archive-dialog.component.html',
  styleUrls: ['./student-archive-dialog.component.scss']
})
export class StudentArchiveDialogComponent implements OnInit {

  student: any
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
      msgOk: `MSG.STUDENT_${!this.student.archived ? '' : 'UN'}ARCHIVED_OK`
    }
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ok(): void {
    this.student.archived = !this.student.archived
    this.studentService.updateStudent(this.data.idStudent, this.student)
      .then((result: any) => {
        this.dialogRef.close(this.data.student)
        this.toastService.success(this.textConfig.msgOk)
      })
      .catch((err: any) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      })
  }

}
