import _moment, { default as _rollupMoment } from 'moment'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, ElementRef, Inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

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
  studentAvatar: string
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
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<StudentCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.ages = ModelService.ageList
    this.avatars = ModelService.avatarList
    this.academicCourses = ModelService.academicCourseList
    this.conservatoryCourses = ModelService.conservatoryCourseList
    this.instruments = ModelService.instrumentList
    this.classroomList = this.classroomService.cachedClassrooms
    this.subjectList = this.subjectService.cachedSubjects

    this.student = this.data.student
    this.studentAvatar = this.student.personal.avatar
    this.equals = UtilService.equals
    this.maxDate = UtilService.today()

    const studentName = this.student.personal.name

    // Init form controls
    this.studentFormGroup = this.formBuilder.group({
      personalFormGroup: this.formBuilder.group({
        nameCtrl: [this.data.isClone ? `${this.translateService.instant('COPY_OF')} ${studentName}` : studentName, Validators.required],
        avatarCtrl: [this.student.personal.avatar],
        birthdateCtrl: [this.studentService.formatInputDate(this.student.personal.birthdate)],
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
      }),
      booleanFormGroup: this.formBuilder.group({
        favoriteCtrl: [this.student.favorite],
        archivedCtrl: [this.student.archived]
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

  toggleBooleanCrl(control: string): void {
    if (!this.studentFormGroup.dirty) {
      this.studentFormGroup.markAsDirty()
      this.studentFormGroup.markAsTouched()
    }
    const formCtrl = this.studentFormGroup.get('booleanFormGroup').get(control)
    formCtrl.setValue(!formCtrl.value)
  }

  save(): void {
    if (this.studentFormGroup.valid) {
      this.data.student.personal.avatar = this.studentAvatar

      const student = this.studentService.normalizeStudent({
        archived: this.studentFormGroup.value.booleanFormGroup.archivedCtrl,
        classroom: {
          classrooms: this.studentFormGroup.value.classroomFormGroup.classroomsCtrl,
          subjects: this.studentFormGroup.value.classroomFormGroup.subjectsCtrl
        },
        contactInformation: {
          phones: this.getPhoneListValues()
        },
        favorite: this.studentFormGroup.value.booleanFormGroup.favoriteCtrl,
        musical: {
          course: this.studentFormGroup.value.musicalFormGroup.courseCtrl,
          instrument: this.studentFormGroup.value.musicalFormGroup.instrumentCtrl,
          teacher: this.studentFormGroup.value.musicalFormGroup.teacherCtrl
        },
        personal: {
          academicCourse: this.studentFormGroup.value.personalFormGroup.academicCourseCtrl,
          avatar: this.data.student.personal.avatar,
          birthdate: this.studentFormGroup.value.personalFormGroup.birthdateCtrl,
          name: this.studentFormGroup.value.personalFormGroup.nameCtrl,
          observations: this.studentFormGroup.value.personalFormGroup.observationsCtrl
        }
      })

      let setStudent: any
      if (this.data.idStudent) {
        setStudent = this.studentService.updateStudent(this.data.idStudent, student)
      } else {
        setStudent = this.studentService.createStudent(student)
      }

      setStudent
        .then((result: any) => {
          this.dialogRef.close(this.data.student)
          const routeId = this.router.url.match(/\/.*\/.*\/(.*)/)

          if (result && result.id) { // Create
            this.toastService.success({
              text: 'MSG.STUDENT_CREATE_OK',
              navigate: { text: 'SEE', route: ['aula/alumno', result.id] }
            })
          } else {// Modify
            if (routeId && routeId[1] === this.data.idStudent) {
              this.toastService.success({ text: 'MSG.STUDENT_UPDATE_OK' })
            } else {
              this.toastService.success({
                text: 'MSG.STUDENT_UPDATE_OK',
                navigate: { text: 'SEE', route: ['aula/alumno', this.data.idStudent] }
              })
            }
          }
        })
        .catch((err: any) => {
          this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
        })
    }
  }

  cancel(): void {
    if (this.studentFormGroup.dirty) {
      if (confirm(this.translateService.instant('MSG.WILL_LOSE_THE_CHANGES'))) {
        this.dialogRef.close()
      }
    } else {
      this.dialogRef.close()
    }
  }
}

