import { Component, OnInit, Inject } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

import { MAT_DIALOG_DATA } from '@angular/material'

import { StudentService } from 'src/app/classroom/services/student.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { ToastService } from 'src/app/shared/services/toast.service'

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
      { value: '0', viewValue: '1º' },
      { value: '1', viewValue: '2º' },
      { value: '2', viewValue: '3º' },
      { value: '3', viewValue: '4º' },
      { value: '4', viewValue: '5º' },
      { value: '5', viewValue: '6º' }
    ]
  }, {
    name: 'FORM.COURSE.SECONDARY',
    group: [
      { value: '6', viewValue: '1º' },
      { value: '7', viewValue: '2º' },
      { value: '8', viewValue: '3º' },
      { value: '9', viewValue: '4º' }
    ]
  }, {
    name: 'FORM.COURSE.HIGH_SCHOOL',
    group: [
      { value: '10', viewValue: '1º' },
      { value: '11', viewValue: '2º' }
    ]
  }]

  conservatoryCourses: any[] = [{
    name: 'FORM.COURSE.ELEMENTARY',
    group: [
      { value: '0', viewValue: '1º' },
      { value: '1', viewValue: '2º' },
      { value: '2', viewValue: '3º' },
      { value: '3', viewValue: '4º' }
    ]
  }, {
    name: 'FORM.COURSE.PROFESSIONAL',
    group: [
      { value: '4', viewValue: '1º' },
      { value: '5', viewValue: '2º' },
      { value: '6', viewValue: '3º' },
      { value: '7', viewValue: '4º' },
      { value: '8', viewValue: '5º' },
      { value: '9', viewValue: '6º' }
    ]
  }, {
    name: 'FORM.COURSE.SUPERIOR',
    group: [
      { value: '10', viewValue: '1º' },
      { value: '11', viewValue: '2º' },
      { value: '12', viewValue: '3º' },
      { value: '13', viewValue: '4º' },
      { value: '14', viewValue: '5º' }
    ]
  }]

  instruments: any[] = [{
    name: 'INSTRUMENTS.GROUP.STRING',
    group: [
      { value: '0', viewValue: 'VIOLIN' },
      { value: '1', viewValue: 'VIOLA' },
      { value: '2', viewValue: 'CELLO' },
      { value: '3', viewValue: 'DOUBLE_BASS' },
      { value: '4', viewValue: 'PIANO' },
      { value: '5', viewValue: 'GUITAR' },
      { value: '6', viewValue: 'HARP' }
    ]
  }, {
    name: 'INSTRUMENTS.GROUP.WIND',
    group: [
      { value: '7', viewValue: 'ACCORDION' },
      { value: '8', viewValue: 'CLARINET' },
      { value: '9', viewValue: 'BASSOON' },
      { value: '10', viewValue: 'BAGPIPE' },
      { value: '11', viewValue: 'FLUTE' },
      { value: '12', viewValue: 'TRANSVERSE_FLUTE' },
      { value: '13', viewValue: 'OBOE' },
      { value: '14', viewValue: 'SAXOPHONE' },
      { value: '15', viewValue: 'TROMBONE' },
      { value: '16', viewValue: 'HORN' },
      { value: '17', viewValue: 'TRUMPET' },
      { value: '18', viewValue: 'TUBA' },
    ]
  }, {
    name: 'INSTRUMENTS.GROUP.PERCUSSION',
    group: [
      { value: '19', viewValue: 'PERCUSSION' }
    ]
  }]

  subjects: any[] = [
    { value: '0', viewValue: 'LANGUAGE' },
    { value: '1', viewValue: 'CELLO' },
    { value: '2', viewValue: 'VIOLIN' }
  ]

  formGroup: FormGroup
  ages: number[] = [] // = [...Array(100).keys()]
  avatarCtrl: any = {}
  student: any = this.data.student

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // Generate ages
    for (let i = 0; i < 100; i++) {
      this.ages.push(i)
    }

    // Init data
    this.initForm()
    console.log(this.data)
  }

  initForm() {
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

  generateData() {
    return {
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
  }

  // TODO: crear funcion modificar
  // TODO: subjects no seleccionadas al modificar
  save() {
    if (this.formGroup.valid) {
      this.studentService.createStudent(this.generateData())
        .then((result) => {
          this.toastService.info('MSG.STUDENT_CREATE_OK')
        }).catch((err) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        }).finally(() => this.loaderService.stop())
    }
  }
}
