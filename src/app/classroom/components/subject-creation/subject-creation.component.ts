import { Subscription } from 'rxjs'
import { debounceTime, switchMap } from 'rxjs/operators'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { TranslateService } from '@ngx-translate/core'

import { StudentService } from '../../services/student.service'
import { SubjectService } from '../../services/subject.service'

@Component({
  selector: 'a13-subject-creation',
  templateUrl: './subject-creation.component.html',
  styleUrls: ['./subject-creation.component.scss']
})
export class SubjectCreationComponent implements OnInit, OnDestroy {

  subjectFormGroup: FormGroup
  studentList: any[]
  studentIdList: any[]
  subject: any

  subjectNameSubscription: Subscription
  querySubjectNameSubscription: Subscription
  validatingName: boolean

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<SubjectCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.subject = this.data.entity

    // Init form controls
    this.subjectFormGroup = this.formBuilder.group({
      nameCtrl: [this.subject.name || '', Validators.required],
      studentListCtrl: [this.studentIdList || []]
    })
    // Listen name changes
    this.onSubjectChange()

    // If edit
    if (this.subject.id) {
      this.queryEnrrolledStudents()
    }
  }

  ngOnInit() { }

  onSubjectChange() {
    const nameCtrl = this.subjectFormGroup.controls.nameCtrl

    this.subjectNameSubscription = nameCtrl.valueChanges
      .subscribe(() => this.validatingName = true)

    this.querySubjectNameSubscription = nameCtrl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(() => this.subjectService.querySubject(UtilService.capitalize(nameCtrl.value)))
      ).subscribe((result: any) => {
        if (result.length && this.data.entity.name !== result[0].payload.doc.data().name) {
          nameCtrl.setErrors({ nameTaken: true })
        }
        nameCtrl.setErrors(nameCtrl.errors)
        nameCtrl.markAsTouched()
        this.validatingName = false
      })
  }

  async queryEnrrolledStudents(): Promise<any> {
    const students = await this.studentService.queryEnrrolledStudents('classroom.subjects', this.subject.id)
    this.studentIdList = students.map((student: any) => student.id)
    this.subjectFormGroup.controls.studentListCtrl.setValue(this.studentIdList)
  }

  formatStudentIdList(): any[] {
    const studentListCtrl = this.subjectFormGroup.value.studentListCtrl
    return studentListCtrl.studentCtrl || studentListCtrl
  }

  async updateStudentSubjects(): Promise<any> {
    const enrrolledStudents = this.formatStudentIdList()
    const students = await this.studentService.getStudentList()
    const studentsMap = students.map((student: any) => {
      const subjects = student.classroom.subjects
      if (enrrolledStudents.includes(student.id)) {
        return !subjects.includes(this.data.entity.id) ? {
          id: student.id,
          classroom: {
            classrooms: student.classroom.classrooms,
            subjects: [...subjects, this.data.entity.id]
          }
        } : undefined
      }
      return subjects.includes(this.data.entity.id) ? {
        id: student.id,
        classroom: {
          classrooms: student.classroom.classrooms,
          subjects: subjects.filter((elem: any) => elem !== this.data.entity.id)
        }
      } : undefined
    })
    return this.studentService.updateStudentBatch(studentsMap)
  }

  save(): any {
    if (this.subjectFormGroup.valid && (
      (this.data.entity.id && !this.subjectFormGroup.pristine) || // Edit && pristine
      (!this.data.entity.id) // Create or Clone
    )) {

      const subject = {
        name: UtilService.capitalize(this.subjectFormGroup.value.nameCtrl || '')
      }

      let setSubject: any
      if (this.data.entity.id) {
        setSubject = this.subjectService.updateSubject(this.data.entity.id, subject)
      } else {
        setSubject = this.subjectService.createSubject(subject)
      }

      setSubject
        .then((result: any) => {
          // If edit
          this.subject.id = result ? result.id : this.subject.id
          this.updateStudentSubjects()
          this.dialogRef.close(this.data.entity)

          const navigateTo = {
            text: 'SEE',
            route: ['classroom/students'],
            queryParams: { subjectsFilter: [this.subject.id], openFilters: true }
          }

          if (!this.data.noToast) {
            if (result && result.id) {// Create
              this.toastService.success({ text: 'MSG.SUBJECT_CREATE_OK', navigate: navigateTo })
            } else {// Modify
              this.toastService.success({ text: 'MSG.SUBJECT_UPDATE_OK', navigate: navigateTo })
            }
          }
        })
        .catch((err: any) => {
          this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
        })
    } else if (this.data.entity.id && this.subjectFormGroup.valid) {// If Edit and valid
      this.dialogRef.close()
    }
  }

  cancel(): void {
    if (this.subjectFormGroup.dirty) {
      if (confirm(this.translateService.instant('MSG.WILL_LOSE_THE_CHANGES'))) {
        this.dialogRef.close()
      }
    } else {
      this.dialogRef.close()
    }
  }

  ngOnDestroy(): void {
    this.subjectNameSubscription.unsubscribe()
    this.querySubjectNameSubscription.unsubscribe()
  }
}
