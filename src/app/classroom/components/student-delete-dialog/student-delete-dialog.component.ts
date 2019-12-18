import { Component, OnInit, Inject } from '@angular/core'
import { Router } from '@angular/router'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

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
    private dialogRef: MatDialogRef<StudentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ok(): void {
    this.studentService.deleteStudent(this.data.idStudent)
      .then((result) => {
        this.dialogRef.close(this.data.student)
        this.router.navigate(['classroom'])
      })
  }

}
