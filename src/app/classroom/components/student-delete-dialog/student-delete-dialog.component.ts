import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'

import { DayService } from '../../services/day.service'
import { StudentService } from '../../services/student.service'

@Component({
  selector: 'a13-student-delete-dialog',
  templateUrl: './student-delete-dialog.component.html',
  styleUrls: ['./student-delete-dialog.component.scss']
})
export class StudentDeleteDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private studentService: StudentService,
    private dayService: DayService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<StudentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  async removeDaysToStudents() {
    const dayList = await this.dayService.getQueryDayList('studentId', '==', this.data.idStudent)
    this.dayService.deleteDayBatch(dayList)
  }

  ok(): void {
    this.studentService.deleteStudent(this.data.idStudent)
      .then((result: any) => {
        this.removeDaysToStudents()
        this.dialogRef.close(this.data.student)
        this.toastService.success({ text: 'MSG.STUDENT_DELETE_OK' })
      })
      .catch((err: any) => {
        this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
      })
  }

}
