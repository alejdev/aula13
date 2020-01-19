import { Component, OnInit, Inject } from '@angular/core'
import { Router } from '@angular/router'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { StudentService } from '../../services/student.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
  selector: 'a13-student-delete-dialog',
  templateUrl: './student-delete-dialog.component.html',
  styleUrls: ['./student-delete-dialog.component.scss']
})
export class StudentDeleteDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private studentService: StudentService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<StudentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ok(): void {
    this.studentService.deleteStudent(this.data.idStudent)
      .then((result: any) => {
        this.dialogRef.close(this.data.student)
        this.router.navigate(['aula/alumnos'])
        this.toastService.success(`MSG.STUDENT_DELETE_OK`)
      })
      .catch((err: any) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      })
  }

}
