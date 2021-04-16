import _moment from 'moment'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ClassroomCreationComponent } from 'src/app/classroom/components/classroom-creation/classroom-creation.component'
import { SubjectCreationComponent } from 'src/app/classroom/components/subject-creation/subject-creation.component'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { CLASSROOM_MODEL, SUBJECT_MODEL } from 'src/app/core/models'
import { ACADEMIC_COURSE_LIST, AVATAR_LIST, CONSERVATORY_COURSE_LIST, DIALOG_CONFIG, INSTRUMENT_LIST } from 'src/app/core/settings'
import { PhonePipe } from 'src/app/shared/pipes/phone.pipe'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, ElementRef, Inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'a13-student-creation',
  templateUrl: './student-creation.component.html',
  styleUrls: ['./student-creation.component.scss'],
  providers: [PhonePipe]
})
export class StudentCreationComponent implements OnInit {

  avatars: any = AVATAR_LIST
  academicCourses: any[] = ACADEMIC_COURSE_LIST
  conservatoryCourses: any[] = CONSERVATORY_COURSE_LIST
  instruments: any[] = INSTRUMENT_LIST
  arrayPhones: any = {}

  classroomList$: Observable<any>
  subjectList$: Observable<any>

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
    private phonePipe: PhonePipe,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<StudentCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.classroomList$ = this.classroomService.observeClassroomList()
      .pipe(map((result) => UtilService.mapCollection(result)))
    this.subjectList$ = this.subjectService.observeSubjectList()
      .pipe(map((result) => UtilService.mapCollection(result)))

    this.generateForm()
  }

  generateForm(): void {
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
      contactPhoneNumberCtrl: [phone ? this.phonePipe.transform(phone.number, true, true) : '', [Validators.required, Validators.pattern(UtilService.regExp.phone)]]
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
          number: this.normalizePhone(phone.contactPhoneNumberCtrl),
        }
      })
    }
    return []
  }

  normalizePhone(number: string): string {
    if (!UtilService.regExp.phoneWithPrefix.test(number)) {
      number = `+34 ${number}`
    }
    return number.replace(/[\s-]/g, '')
  }

  toggleBooleanCrl(control: string): void {
    this.markFormAsDirty()
    const formCtrl = this.studentFormGroup.get('booleanFormGroup').get(control)
    formCtrl.setValue(!formCtrl.value)
  }

  markFormAsDirty(): void {
    if (!this.studentFormGroup.dirty) { this.studentFormGroup.markAsDirty() }
  }

  save(): void {
    if (this.studentFormGroup.valid && (
      (this.data.idStudent && !this.studentFormGroup.pristine) || // Edit && pristine
      (!this.data.idStudent) // Create or Clone
    )) {
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
          this.dialogRef.close(result)

          if (result && result.id) { // Create
            this.toastService.success({
              text: 'MSG.STUDENT_CREATE_OK',
              navigate: { text: 'SEE', route: ['classroom/student', result.id] }
            })
          } else {// Modify
            const routeId = this.router.url.match(UtilService.regExp.idInUrl)
            if (routeId && routeId[1] === this.data.idStudent) {
              this.toastService.success({ text: 'MSG.STUDENT_UPDATE_OK' })
            } else {
              this.toastService.success({
                text: 'MSG.STUDENT_UPDATE_OK',
                navigate: { text: 'SEE', route: ['classroom/student', this.data.idStudent] }
              })
            }
          }
        })
        .catch((err: any) => {
          this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
        })
    } else if (this.data.idStudent && this.studentFormGroup.valid) {// If Edit and valid
      this.dialogRef.close()
    } else if (this.studentFormGroup.invalid) { // ScrollTop if errors
      document.querySelector('section.dialog-content').scrollTop = 0
    }
  }

  createClassroom(): void {
    this.dialog.open(ClassroomCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        entity: UtilService.clone(CLASSROOM_MODEL),
        noToast: true
      }
    })
  }

  createSubject(): void {
    this.dialog.open(SubjectCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        entity: UtilService.clone(SUBJECT_MODEL),
        noToast: true
      }
    })
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

