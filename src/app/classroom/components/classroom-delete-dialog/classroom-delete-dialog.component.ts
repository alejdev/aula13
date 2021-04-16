import { Classroom, Student } from 'src/app/core/interfaces'
import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { ClassroomService } from '../../services/classroom.service'
import { StudentService } from '../../services/student.service'

@Component({
  selector: 'a13-classroom-delete-dialog',
  templateUrl: '../templates/simple-dialog.template.html',
  styleUrls: ['./classroom-delete-dialog.component.scss']
})
export class ClassroomDeleteDialogComponent implements OnInit {

  textConfig: any

  constructor(
    private classroomService: ClassroomService,
    private studentService: StudentService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<ClassroomDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.textConfig = {
      title: 'CLASSROOM_DELETE',
      msg: 'MSG.CLASSROOM_DELETE',
      msg2: 'MSG.CLASSROOM_DELETE_2',
      okButton: 'DELETE',
      okButtonColor: 'warn'
    }
  }

  async removeClassroomsToStudents() {
    const students = await this.studentService.queryEnrrolledStudents('classroom.classrooms', this.data.entity.id)
    const studentList = students.map((student: Student) => {
      const classrooms = student.classroom.classrooms
      return classrooms.includes(this.data.entity.id) ? {
        id: student.id,
        classroom: {
          classrooms: classrooms.filter((elem: Classroom) => elem !== this.data.entity.id),
          subjects: student.classroom.subjects
        }
      } : undefined
    })
    this.studentService.updateStudentBatch(studentList)
  }

  ok(): void {
    this.classroomService.deleteClassroom(this.data.entity.id)
      .then(() => {
        this.removeClassroomsToStudents()
        this.dialogRef.close(this.data.entity)
        this.toastService.success({ text: 'MSG.CLASSROOM_DELETE_OK' })
      })
      .catch((err: any) => {
        this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
      })
  }

  cancel(): void {
    this.dialogRef.close()
  }
}
