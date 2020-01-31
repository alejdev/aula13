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

  // TODO: batch
  removeClassroomsToStudents(): void {
    const classroomId = this.data.entity.id
    this.studentService.queryStudentsByClassroom(classroomId)
      .subscribe((result: any) => {
        const studentList = this.studentService.mapStudentList(result)
        studentList.forEach((student: any) => {
          student.classroom.classrooms = student.classroom.classrooms.filter((elem: any) => elem !== classroomId)
          this.studentService.updateStudent(student.id, student)
        })
      })
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
