import { Component, OnInit, Inject } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { StudentService } from 'src/app/classroom/services/student.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

@Component({
  selector: 'a13-student-creation',
  templateUrl: './student-creation.component.html',
  styleUrls: ['./student-creation.component.scss']
})
export class StudentCreationComponent implements OnInit {

  avatars: any = ['user-default', 'boy-0', 'girl-0', 'boy-1', 'girl-1', 'boy-2', 'girl-2', 'boy-3', 'girl-3', 'boy-4', 'girl-4', 'boy-5', 'girl-5', 'boy-6', 'girl-6', 'boy-7', 'girl-7', 'boy-8', 'girl-8', 'boy-9', 'girl-9', 'boy-10', 'girl-10', 'boy-11', 'girl-11', 'boy-12', 'girl-12', 'boy-13', 'girl-13', 'boy-14', 'girl-14', 'boy-15', 'girl-15', 'boy-16', 'girl-16', 'boy-17', 'girl-17', 'boy-18', 'girl-18', 'boy-19', 'girl-19', 'boy-20', 'girl-20', 'boy-21', 'girl-21', 'boy-22', 'girl-22']

  academicCourses: any[] = [{
    name: 'FORM.COURSE.PRIMARY',
    group: [
      { id: '0', viewValue: '1º' },
      { id: '1', viewValue: '2º' },
      { id: '2', viewValue: '3º' },
      { id: '3', viewValue: '4º' },
      { id: '4', viewValue: '5º' },
      { id: '5', viewValue: '6º' }
    ]
  }, {
    name: 'FORM.COURSE.SECONDARY',
    group: [
      { id: '6', viewValue: '1º' },
      { id: '7', viewValue: '2º' },
      { id: '8', viewValue: '3º' },
      { id: '9', viewValue: '4º' }
    ]
  }, {
    name: 'FORM.COURSE.HIGH_SCHOOL',
    group: [
      { id: '10', viewValue: '1º' },
      { id: '11', viewValue: '2º' }
    ]
  }]

  conservatoryCourses: any[] = [{
    name: 'FORM.COURSE.ELEMENTARY',
    group: [
      { id: '0', viewValue: '1º' },
      { id: '1', viewValue: '2º' },
      { id: '2', viewValue: '3º' },
      { id: '3', viewValue: '4º' }
    ]
  }, {
    name: 'FORM.COURSE.PROFESSIONAL',
    group: [
      { id: '4', viewValue: '1º' },
      { id: '5', viewValue: '2º' },
      { id: '6', viewValue: '3º' },
      { id: '7', viewValue: '4º' },
      { id: '8', viewValue: '5º' },
      { id: '9', viewValue: '6º' }
    ]
  }, {
    name: 'FORM.COURSE.SUPERIOR',
    group: [
      { id: '10', viewValue: '1º' },
      { id: '11', viewValue: '2º' },
      { id: '12', viewValue: '3º' },
      { id: '13', viewValue: '4º' },
      { id: '14', viewValue: '5º' }
    ]
  }]

  instruments: any[] = [{
    name: 'INSTRUMENTS.GROUP.STRING',
    group: [
      { id: '0', viewValue: 'VIOLIN' },
      { id: '1', viewValue: 'VIOLA' },
      { id: '2', viewValue: 'CELLO' },
      { id: '3', viewValue: 'DOUBLE_BASS' },
      { id: '4', viewValue: 'PIANO' },
      { id: '5', viewValue: 'GUITAR' },
      { id: '6', viewValue: 'HARP' }
    ]
  }, {
    name: 'INSTRUMENTS.GROUP.WIND',
    group: [
      { id: '7', viewValue: 'ACCORDION' },
      { id: '8', viewValue: 'CLARINET' },
      { id: '9', viewValue: 'BASSOON' },
      { id: '10', viewValue: 'BAGPIPE' },
      { id: '11', viewValue: 'FLUTE' },
      { id: '12', viewValue: 'TRANSVERSE_FLUTE' },
      { id: '13', viewValue: 'OBOE' },
      { id: '14', viewValue: 'SAXOPHONE' },
      { id: '15', viewValue: 'TROMBONE' },
      { id: '16', viewValue: 'HORN' },
      { id: '17', viewValue: 'TRUMPET' },
      { id: '18', viewValue: 'TUBA' },
    ]
  }, {
    name: 'INSTRUMENTS.GROUP.PERCUSSION',
    group: [
      { id: '19', viewValue: 'PERCUSSION' }
    ]
  }]

  subjects: any[] = [
    { id: '0', viewValue: 'LANGUAGE' },
    { id: '1', viewValue: 'CELLO' },
    { id: '2', viewValue: 'VIOLIN' }
  ]

  formGroup: FormGroup
  ages: any[] = Array(100).fill(0).map((e, i) => i + 1)
  student: any = this.data.student
  equals: any = UtilService.equals

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<StudentCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // Init form controls
    this.formGroup = this.formBuilder.group({
      studentNameCtrl: [this.student.name, Validators.required],
      studentAvatarCtrl: [this.student.avatar],
      studentAgeCtrl: [this.student.age],
      studentAcademicCourseCtrl: [this.student.academicCourse],
      fatherNameCtrl: [this.student.parents.fatherName],
      fatherPhoneCtrl: [this.student.parents.fatherPhone],
      motherNameCtrl: [this.student.parents.motherName],
      motherPhoneCtrl: [this.student.parents.motherPhone],
      musicalCourseCtrl: [this.student.musical.musicalCourse],
      musicalTeacherCtrl: [this.student.musical.musicalTeacher],
      instrumentCtrl: [this.student.musical.instrument],
      subjectsCtrl: [this.student.musical.subjects]
    })
  }

  save() {
    if (this.formGroup.valid) {
      const student = {
        name: this.formGroup.value.studentNameCtrl,
        avatar: this.student.avatar,
        age: this.formGroup.value.studentAgeCtrl,
        academicCourse: this.formGroup.value.studentAcademicCourseCtrl,
        parents: {
          fatherName: this.formGroup.value.fatherNameCtrl,
          fatherPhone: this.formGroup.value.fatherPhoneCtrl,
          motherName: this.formGroup.value.motherNameCtrl,
          motherPhone: this.formGroup.value.motherPhoneCtrl
        },
        musical: {
          musicalCourse: this.formGroup.value.musicalCourseCtrl,
          musicalTeacher: this.formGroup.value.musicalTeacherCtrl,
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
        }).catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        }).finally(() => this.loaderService.stop())
    }
  }
}
