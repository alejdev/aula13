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
  avatarCtrl: any = { name: 'Avatar por defecto', src: 'assets/svgs/user-default.svg' }

  avatars: any = [
    { id: 'default', src: 'assets/svgs/user-default.svg' },
    { id: 'chico_0', src: 'assets/svgs/avatars/boy-0.svg' },
    { id: 'chica_0', src: 'assets/svgs/avatars/girl-0.svg' },
    { id: 'chico_1', src: 'assets/svgs/avatars/boy-1.svg' },
    { id: 'chica_1', src: 'assets/svgs/avatars/girl-1.svg' },
    { id: 'chico_2', src: 'assets/svgs/avatars/boy-2.svg' },
    { id: 'chica_2', src: 'assets/svgs/avatars/girl-2.svg' },
    { id: 'chico_3', src: 'assets/svgs/avatars/boy-3.svg' },
    { id: 'chica_3', src: 'assets/svgs/avatars/girl-3.svg' },
    { id: 'chico_4', src: 'assets/svgs/avatars/boy-4.svg' },
    { id: 'chica_4', src: 'assets/svgs/avatars/girl-4.svg' },
    { id: 'chico_5', src: 'assets/svgs/avatars/boy-5.svg' },
    { id: 'chica_5', src: 'assets/svgs/avatars/girl-5.svg' },
    { id: 'chico_6', src: 'assets/svgs/avatars/boy-6.svg' },
    { id: 'chica_6', src: 'assets/svgs/avatars/girl-6.svg' },
    { id: 'chico_7', src: 'assets/svgs/avatars/boy-7.svg' },
    { id: 'chica_7', src: 'assets/svgs/avatars/girl-7.svg' },
    { id: 'chico_8', src: 'assets/svgs/avatars/boy-8.svg' },
    { id: 'chica_8', src: 'assets/svgs/avatars/girl-8.svg' },
    { id: 'chico_9', src: 'assets/svgs/avatars/boy-9.svg' },
    { id: 'chica_9', src: 'assets/svgs/avatars/girl-9.svg' },
    { id: 'chico_10', src: 'assets/svgs/avatars/boy-10.svg' },
    { id: 'chica_10', src: 'assets/svgs/avatars/girl-10.svg' },
    { id: 'chico_11', src: 'assets/svgs/avatars/boy-11.svg' },
    { id: 'chica_11', src: 'assets/svgs/avatars/girl-11.svg' },
    { id: 'chico_12', src: 'assets/svgs/avatars/boy-12.svg' },
    { id: 'chica_12', src: 'assets/svgs/avatars/girl-12.svg' },
    { id: 'chico_13', src: 'assets/svgs/avatars/boy-13.svg' },
    { id: 'chica_13', src: 'assets/svgs/avatars/girl-13.svg' },
    { id: 'chico_14', src: 'assets/svgs/avatars/boy-14.svg' },
    { id: 'chica_14', src: 'assets/svgs/avatars/girl-14.svg' },
    { id: 'chico_15', src: 'assets/svgs/avatars/boy-15.svg' },
    { id: 'chica_15', src: 'assets/svgs/avatars/girl-15.svg' },
    { id: 'chico_16', src: 'assets/svgs/avatars/boy-16.svg' },
    { id: 'chica_16', src: 'assets/svgs/avatars/girl-16.svg' },
    { id: 'chico_17', src: 'assets/svgs/avatars/boy-17.svg' },
    { id: 'chica_17', src: 'assets/svgs/avatars/girl-17.svg' },
    { id: 'chico_18', src: 'assets/svgs/avatars/boy-18.svg' },
    { id: 'chica_18', src: 'assets/svgs/avatars/girl-18.svg' },
    { id: 'chico_19', src: 'assets/svgs/avatars/boy-19.svg' },
    { id: 'chica_19', src: 'assets/svgs/avatars/girl-19.svg' },
    { id: 'chico_20', src: 'assets/svgs/avatars/boy-20.svg' },
    { id: 'chica_20', src: 'assets/svgs/avatars/girl-20.svg' },
    { id: 'chico_21', src: 'assets/svgs/avatars/boy-21.svg' },
    { id: 'chica_21', src: 'assets/svgs/avatars/girl-21.svg' },
    { id: 'chico_22', src: 'assets/svgs/avatars/boy-22.svg' },
    { id: 'chica_22', src: 'assets/svgs/avatars/girl-22.svg' }
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
      { value: '0', viewValue: 'INSTRUMENT.VIOLIN' },
      { value: '1', viewValue: 'INSTRUMENT.VIOLA' },
      { value: '2', viewValue: 'INSTRUMENT.CELLO' },
      { value: '3', viewValue: 'INSTRUMENT.DOUBLE_BASS' },
      { value: '4', viewValue: 'INSTRUMENT.PIANO' },
      { value: '5', viewValue: 'INSTRUMENT.GUITAR' },
      { value: '6', viewValue: 'INSTRUMENT.HARP' }
    ]
  }, {
    name: 'INSTRUMENTS.GROUP.WIND',
    group: [
      { value: '7', viewValue: 'INSTRUMENT.ACCORDION' },
      { value: '8', viewValue: 'INSTRUMENT.CLARINET' },
      { value: '9', viewValue: 'INSTRUMENT.BASSOON' },
      { value: '10', viewValue: 'INSTRUMENT.BAGPIPE' },
      { value: '11', viewValue: 'INSTRUMENT.FLUTE' },
      { value: '12', viewValue: 'INSTRUMENT.TRANSVERSE_FLUTE' },
      { value: '13', viewValue: 'INSTRUMENT.OBOE' },
      { value: '14', viewValue: 'INSTRUMENT.SAXOPHONE' },
      { value: '15', viewValue: 'INSTRUMENT.TROMBONE' },
      { value: '16', viewValue: 'INSTRUMENT.HORN' },
      { value: '17', viewValue: 'INSTRUMENT.TRUMPET' },
      { value: '18', viewValue: 'INSTRUMENT.TUBA' },
    ]
  }, {
    name: 'INSTRUMENTS.GROUP.PERCUSSION',
    group: [
      { value: '19', viewValue: 'INSTRUMENT.PERCUSSION' }
    ]
  }]

  subjects: any[] = [
    { value: '0', viewValue: 'SUBJECT.LANGUAGE' },
    { value: '1', viewValue: 'SUBJECT.CELLO' },
    { value: '2', viewValue: 'SUBJECT.VIOLIN' }
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
        personal: {
          name: this.formGroup.value.studentNameCtrl,
          avatar: this.avatarCtrl,
          age: this.formGroup.value.studentAgeCtrl,
          academicCourse: this.formGroup.value.studentAcademicCourseCtrl
        },
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
          sujects: this.formGroup.value.subjectsCtrl
        }
      }).then((result) => {
        this.toastService.info('MSG.STUDENT_CREATE_OK')
      }).catch((err) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      }).finally(() => this.loaderService.stop())
    }
  }
}
