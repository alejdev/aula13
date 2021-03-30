import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { ClassroomService } from '../../services/classroom.service'
import { StudentService } from '../../services/student.service'

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

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  async removeClassroomsToStudents() {
    const students = await this.studentService.queryEnrrolledStudents('classroom.classrooms', this.data.entity.id)
    const studentList = students.map((student: any) => {
      const classrooms = student.classroom.classrooms
      return classrooms.includes(this.data.entity.id) ? {
        id: student.id,
        classroom: {
          classrooms: classrooms.filter((elem: any) => elem !== this.data.entity.id),
          subjects: student.classroom.subjects
        }
      } : undefined
    })
    this.studentService.updateStudentBatch(studentList)
  }

  ok(): void {
    this.classroomService.deleteClassroom(this.data.entity.id)
      .then((result: any) => {
        this.removeClassroomsToStudents()
        this.dialogRef.close(this.data.entity)
        this.toastService.success({ text: 'MSG.CLASSROOM_DELETE_OK' })
      })
      .catch((err: any) => {
        this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
      })
  }
}
