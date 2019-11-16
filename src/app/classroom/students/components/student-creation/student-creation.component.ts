import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

import { StudentService } from 'src/app/classroom/services/student.service'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
  selector: 'a13-student-creation',
  templateUrl: './student-creation.component.html',
  styleUrls: ['./student-creation.component.scss']
})
export class StudentCreationComponent implements OnInit {

  ages: number[] = [] // = [...Array(100).keys()]
  avatarCtrl: any = { id: 'user-default' }

  avatars: any = [
    { id: 'user-default' },
    { id: 'boy-0' },
    { id: 'girl-0' },
    { id: 'boy-1' },
    { id: 'girl-1' },
    { id: 'boy-2' },
    { id: 'girl-2' },
    { id: 'boy-3' },
    { id: 'girl-3' },
    { id: 'boy-4' },
    { id: 'girl-4' },
    { id: 'boy-5' },
    { id: 'girl-5' },
    { id: 'boy-6' },
    { id: 'girl-6' },
    { id: 'boy-7' },
    { id: 'girl-7' },
    { id: 'boy-8' },
    { id: 'girl-8' },
    { id: 'boy-9' },
    { id: 'girl-9' },
    { id: 'boy-10' },
    { id: 'girl-10' },
    { id: 'boy-11' },
    { id: 'girl-11' },
    { id: 'boy-12' },
    { id: 'girl-12' },
    { id: 'boy-13' },
    { id: 'girl-13' },
    { id: 'boy-14' },
    { id: 'girl-14' },
    { id: 'boy-15' },
    { id: 'girl-15' },
    { id: 'boy-16' },
    { id: 'girl-16' },
    { id: 'boy-17' },
    { id: 'girl-17' },
    { id: 'boy-18' },
    { id: 'girl-18' },
    { id: 'boy-19' },
    { id: 'girl-19' },
    { id: 'boy-20' },
    { id: 'girl-20' },
    { id: 'boy-21' },
    { id: 'girl-21' },
    { id: 'boy-22' },
    { id: 'girl-22' }
  ]

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

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.ages.push(i)
    }

    this.formGroup = this.formBuilder.group({
      studentNameCtrl: ['', Validators.required],
      studentAvatarCtrl: [''],
      studentAgeCtrl: [''],
      studentAcademicCourseCtrl: [''],
      fatherNameCtrl: [''],
      fatherPhoneCtrl: [''],
      motherNameCtrl: [''],
      motherPhoneCtrl: [''],
      musicalCourseCtrl: [''],
      musicalTeacherCtrl: [''],
      instrumentCtrl: [''],
      subjectsCtrl: ['']
    })
  }

  save() {
    if (this.formGroup.valid) {
      this.studentService.createStudent({
        name: this.formGroup.value.studentNameCtrl,
        avatar: this.avatarCtrl.id,
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
      }).then((result) => {
        this.toastService.info('MSG.STUDENT_CREATE_OK')
      }).catch((err) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      }).finally(() => this.loaderService.stop())
    }
  }
}
