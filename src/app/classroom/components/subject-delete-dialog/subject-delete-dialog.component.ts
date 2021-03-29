import { Component, OnInit, Inject } from '@angular/core'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { SubjectService } from '../../services/subject.service'
import { StudentService } from '../../services/student.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
  selector: 'a13-subject-delete-dialog',
  templateUrl: './subject-delete-dialog.component.html',
  styleUrls: ['./subject-delete-dialog.component.scss']
})
export class SubjectDeleteDialogComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private studentService: StudentService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<SubjectDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  async removeSubjectsToStudents() {
    const students = await this.studentService.queryEnrrolledStudents('classroom.subjects', this.data.entity.id)
    const studentList = students.map((student: any) => {
      const subjects = student.classroom.subjects
      return subjects.includes(this.data.entity.id) ? {
        id: student.id,
        classroom: {
          classrooms: student.classroom.classrooms,
          subjects: subjects.filter((elem: any) => elem !== this.data.entity.id)
        }
      } : undefined
    })
    this.studentService.updateStudentBatch(studentList)
  }

  ok(): void {
    this.subjectService.deleteSubject(this.data.entity.id)
      .then((result: any) => {
        this.removeSubjectsToStudents()
        this.dialogRef.close(this.data.entity)
        this.toastService.success('MSG.SUBJECT_DELETE_OK')
      })
      .catch((err: any) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      })
  }

}