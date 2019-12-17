import { Component, OnInit, Inject } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { StudentService } from 'src/app/classroom/services/student.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { ModelService } from 'src/app/shared/services/model.service'

@Component({
  selector: 'a13-student-creation',
  templateUrl: './student-creation.component.html',
  styleUrls: ['./student-creation.component.scss']
})
export class StudentCreationComponent implements OnInit {

  ages: number[]
  avatars: any
  academicCourses: any[]
  conservatoryCourses: any[]
  instruments: any[]
  subjects: any[]

  formGroup: FormGroup
  student: any
  equals: any

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<StudentCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.ages = ModelService.ageList
    this.avatars = ModelService.avatarList
    this.academicCourses = ModelService.academicCourseList
    this.conservatoryCourses = ModelService.conservatoryCourseList
    this.instruments = ModelService.instrumentList
    this.subjects = ModelService.subjectList

    this.student = this.data.student
    this.equals = UtilService.equals

    // Init form controls
    this.formGroup = this.formBuilder.group({
      studentNameCtrl: [this.student.name, Validators.required],
      studentAvatarCtrl: [this.student.avatar],
      studentAgeCtrl: [this.student.age],
      studentAcademicCourseCtrl: [this.student.academicCourse],
      fatherNameCtrl: [this.student.parents.father.name],
      fatherPhoneCtrl: [this.student.parents.father.phone, Validators.pattern(UtilService.regExp.phone)],
      motherNameCtrl: [this.student.parents.mother.name],
      motherPhoneCtrl: [this.student.parents.mother.phone, Validators.pattern(UtilService.regExp.phone)],
      musicalCourseCtrl: [this.student.musical.course],
      musicalTeacherCtrl: [this.student.musical.teacher],
      instrumentCtrl: [this.student.musical.instrument],
      subjectsCtrl: [this.student.musical.subjects]
    })
  }

  setGroup(control: string, group: any): void {
    this.formGroup.value[control] = group.groupId
  }

  save() {
    if (this.formGroup.valid) {
      const student = {
        name: this.formGroup.value.studentNameCtrl,
        avatar: this.student.avatar,
        age: this.formGroup.value.studentAgeCtrl,
        academicCourse: this.formGroup.value.studentAcademicCourseCtrl,
        parents: {
          father: {
            name: this.formGroup.value.fatherNameCtrl,
            phone: this.formGroup.value.fatherPhoneCtrl
          },
          mother: {
            name: this.formGroup.value.motherNameCtrl,
            phone: this.formGroup.value.motherPhoneCtrl
          }
        },
        musical: {
          course: this.formGroup.value.musicalCourseCtrl,
          teacher: this.formGroup.value.musicalTeacherCtrl,
          instrument: this.formGroup.value.instrumentCtrl,
          subjects: this.formGroup.value.subjectsCtrl || []
        }
      }
      let createStudent: any
      if (this.data.idStudent) {
        createStudent = this.studentService.updateStudent(this.data.idStudent, student)
      } else {
        createStudent = this.studentService.createStudent(student)
      }
      createStudent
        .then((result: any) => {
          this.toastService.info(`MSG.STUDENT_${this.data.idStudent ? 'UPDATE' : 'CREATE'}_OK`)
          this.dialogRef.close(this.data.student)
        })
        .catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        })
    }
  }
}
