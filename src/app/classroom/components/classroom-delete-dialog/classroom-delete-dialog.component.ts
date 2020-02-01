import { Component, OnInit, Inject } from '@angular/core'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { ClassroomService } from '../../services/classroom.service'
import { StudentService } from '../../services/student.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
  selector: 'a13-classroom-delete-dialog',
  templateUrl: './classroom-delete-dialog.component.html',
  styleUrls: ['./classroom-delete-dialog.component.scss']
})
export class ClassroomDeleteDialogComponent implements OnInit {

  constructor(
    private classroomService: ClassroomService,
    private studentService: StudentService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<ClassroomDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  async removeClassroomsToStudents() {
    const students = await this.studentService.queryStudentsByClassroom(this.data.entity.id)
    const studentList = students.map((student: any) => this.studentService.removeStudentClassroom(student, this.data.entity.id))
    this.studentService.updateStudentBatch(studentList)
  }

  ok(): void {
    this.classroomService.deleteClassroom(this.data.entity.id)
      .then((result: any) => {
        this.removeClassroomsToStudents()
        this.dialogRef.close(this.data.entity)
        this.toastService.success('MSG.CLASSROOM_DELETE_OK')
      })
      .catch((err: any) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      })
  }
}
