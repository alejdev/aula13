import { Component, OnInit, Inject, ElementRef } from '@angular/core'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { Router } from '@angular/router'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { StudentService } from 'src/app/classroom/services/student.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'

import _moment from 'moment'
import { default as _rollupMoment } from 'moment'
const moment = _rollupMoment || _moment

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
  classroomList: any[]
  subjectList: any[]
  arrayPhones: any = {}

  studentFormGroup: FormGroup
  student: any
  equals: any
  maxDate: Date

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
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
    this.classroomList = this.classroomService.getCachedClassroomList()
    this.subjectList = this.subjectService.getCachedSubjectList()

    this.student = this.data.student
    this.equals = UtilService.equals
    this.maxDate = UtilService.today()

    // Init form controls
    this.studentFormGroup = this.formBuilder.group({
      personalFormGroup: this.formBuilder.group({
        nameCtrl: [this.student.personal.name, Validators.required],
        avatarCtrl: [this.student.personal.avatar],
        birthdateCtrl: [this.formatInputDate(this.student.personal.birthdate)],
        academicCourseCtrl: [this.student.personal.academicCourse],
        observationsCtrl: [this.student.personal.observations]
      }),
      contactInformationFormGroup: this.formBuilder.group({
        phonesFormArray: this.formBuilder.array([])
      }),
      musicalFormGroup: this.formBuilder.group({
        courseCtrl: [this.student.musical.course],
        teacherCtrl: [this.student.musical.teacher],
        instrumentCtrl: [this.student.musical.instrument]
      }),
      classroomFormGroup: this.formBuilder.group({
        classroomsCtrl: [this.student.classroom.classrooms],
        subjectsCtrl: [this.student.classroom.subjects]
      })
    })

    // Add phone controls dinamically
    if (this.student.contactInformation && this.student.contactInformation.phones) {
      for (const phone of this.student.contactInformation.phones) {
        this.addPhone(phone)
      }
    }
  }

  formatInputDate(date: any) {
    if (date) {
      return moment(date, 'DD/MM/YYYY')
    }
    return ''
  }

  formatOutputDate(date: any) {
    if (date && date._isAMomentObject && date._isValid) {
      return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
    }
    return ''
  }

  initPhoneControls(phone: any): FormGroup {
    return this.formBuilder.group({
      contactPhoneNameCtrl: [phone ? phone.name : '', [Validators.required]],
      contactPhoneNumberCtrl: [phone ? phone.number : '', [Validators.required, Validators.pattern(UtilService.regExp.phone)]]
    })
  }

  addPhone(phone?: any, focus?: boolean): void {
    this.arrayPhones = this.studentFormGroup.get('contactInformationFormGroup').get('phonesFormArray') as FormArray
    this.arrayPhones.push(this.initPhoneControls(phone))
    if (focus) {
      setTimeout(() => this.focusNewPhone(), 200)
    }
  }

  focusNewPhone(): void {
    const phoneList = this.elementRef.nativeElement.querySelectorAll('.phone-list input')
    const lastPhone = phoneList[phoneList.length - 2]
    lastPhone.focus()
  }

  removePhone(index: any): void {
    this.arrayPhones.removeAt(index)
  }

  getPhoneListValues(): any[] {
    if (this.arrayPhones.value) {
      return this.arrayPhones.value.map((phone: any) => {
        return {
          name: phone.contactPhoneNameCtrl,
          number: phone.contactPhoneNumberCtrl,
        }
      })
    }
    return []
  }

  save(): void {
    if (this.studentFormGroup.valid) {
      const student = {
        classroom: {
          classrooms: this.studentFormGroup.value.classroomFormGroup.classroomsCtrl || [],
          subjects: this.studentFormGroup.value.classroomFormGroup.subjectsCtrl || []
        },
        contactInformation: {
          phones: this.getPhoneListValues()
        },
        favorite: false,
        musical: {
          course: this.studentFormGroup.value.musicalFormGroup.courseCtrl || '',
          instrument: this.studentFormGroup.value.musicalFormGroup.instrumentCtrl || '',
          teacher: this.studentFormGroup.value.musicalFormGroup.teacherCtrl
        },
        personal: {
          academicCourse: this.studentFormGroup.value.personalFormGroup.academicCourseCtrl || '',
          avatar: this.student.personal.avatar,
          birthdate: this.formatOutputDate(this.studentFormGroup.value.personalFormGroup.birthdateCtrl),
          name: UtilService.capitalize(this.studentFormGroup.value.personalFormGroup.nameCtrl),
          observations: this.studentFormGroup.value.personalFormGroup.observationsCtrl
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
          this.toastService.success(`MSG.STUDENT_${this.data.idStudent ? 'UPDATE' : 'CREATE'}_OK`)
          this.dialogRef.close(this.data.student)
          // Go to profile when create
          if (result && result.id) {
            this.router.navigate(['aula/alumno', result.id])
          }
        })
        .catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        })
    }
  }
}
