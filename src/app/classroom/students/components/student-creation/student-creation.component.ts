import { Component, OnInit, Inject, ElementRef } from '@angular/core'
import { Validators, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms'

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
  arrayPhones: any = {}

  formGroup: FormGroup
  student: any
  equals: any

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
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
      studentObservationsCtrl: [this.student.observations],
      musicalCourseCtrl: [this.student.musical.course],
      musicalTeacherCtrl: [this.student.musical.teacher],
      instrumentCtrl: [this.student.musical.instrument],
      subjectsCtrl: [this.student.musical.subjects],
      contactInformation: this.formBuilder.group({
        phones: this.formBuilder.array([])
      })
    })

    // Add phone controls dinamically
    if (this.student.contactInformation && this.student.contactInformation.phones) {
      for (const phone of this.student.contactInformation.phones) {
        this.addPhone(phone)
      }
    }
  }

  initPhoneControls(phone: any): FormGroup {
    return this.formBuilder.group({
      contactPhoneNameCtrl: [phone ? phone.name : '', [Validators.required]],
      contactPhoneNumberCtrl: [phone ? phone.number : '', [Validators.required, Validators.pattern(UtilService.regExp.phone)]]
    })
  }

  addPhone(phone?: any, focus?: boolean): void {
    this.arrayPhones = this.formGroup.get('contactInformation').get('phones') as FormArray
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
    if (this.formGroup.valid) {
      const student = {
        name: this.formGroup.value.studentNameCtrl,
        avatar: this.student.avatar,
        age: this.formGroup.value.studentAgeCtrl || '',
        academicCourse: this.formGroup.value.studentAcademicCourseCtrl || '',
        observations: this.formGroup.value.studentObservationsCtrl,
        contactInformation: {
          phones: this.getPhoneListValues()
        },
        musical: {
          course: this.formGroup.value.musicalCourseCtrl || '',
          teacher: this.formGroup.value.musicalTeacherCtrl,
          instrument: this.formGroup.value.instrumentCtrl || '',
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
