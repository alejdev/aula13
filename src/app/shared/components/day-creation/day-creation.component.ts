import '@ckeditor/ckeditor5-build-classic/build/translations/es'
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb'
import '@ckeditor/ckeditor5-build-classic/build/translations/de'
import '@ckeditor/ckeditor5-build-classic/build/translations/it'
import '@ckeditor/ckeditor5-build-classic/build/translations/fr'

import { DayService } from 'src/app/classroom/services/day.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { Day, Student, Subject } from 'src/app/core/interfaces'
import { CKEDITOR_CONFIG } from 'src/app/core/settings'
import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, Inject, OnInit } from '@angular/core'
import { DocumentReference } from '@angular/fire/firestore'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic'
import { TranslateService } from '@ngx-translate/core'

import { SettingService } from '../../services/setting.service'
import { UtilService } from '../../services/util.service'

@Component({
  selector: 'a13-day-creation',
  templateUrl: './day-creation.component.html',
  styleUrls: ['./day-creation.component.scss']
})
export class DayCreationComponent implements OnInit {

  day: Day
  studentList: Student[]
  subjectList: Subject[]
  dayFormGroup: FormGroup
  ckeditor: any = DecoupledEditor
  editorConfig: any

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dayService: DayService,
    private subjectService: SubjectService,
    private toastService: ToastService,
    private settingService: SettingService,
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<DayCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.day = this.data.day
    this.editorConfig = {
      language: this.settingService.value.lang,
      placeholder: this.translateService.instant('FORM.DAY_EDITOR_PLACEHOLDER'),
      ...CKEDITOR_CONFIG,
    }

    const dayTitle = this.day.title

    this.subjectList = this.getStudentSubjectList(this.day.student)

    // Init form controls
    this.dayFormGroup = this.formBuilder.group({
      dayStudentCtrl: [this.day.student, Validators.required],
      dayDateCtrl: [this.dayService.formatInputDate(this.day.date), Validators.required],
      dayTitleCtrl: [this.data.isClone ? `${this.translateService.instant('COPY_OF')} ${dayTitle}` : dayTitle, Validators.required],
      dayContentCtrl: [this.day.content, Validators.required],
      daySubjectCtrl: [this.day.subjectId],
      dayFavoriteCtrl: [this.day.favorite],
      dayArchivedCtrl: [this.day.archived],
    })

    this.dayFormGroup.controls.dayStudentCtrl.valueChanges
      .subscribe(result => {
        this.subjectList = this.getStudentSubjectList(result.studentCtrl)
        if (!this.subjectList.some((subject: Subject) => subject.id === this.dayFormGroup.controls.daySubjectCtrl.value)) {
          this.dayFormGroup.controls.daySubjectCtrl.reset()
        }
      })
  }

  onReady(editor: any): void {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )
  }

  getStudentId(): any {
    const dayStudentCtrl = this.dayFormGroup.value.dayStudentCtrl
    if (dayStudentCtrl.hasOwnProperty('studentCtrl')) {
      return dayStudentCtrl.studentCtrl.id
    }
    return dayStudentCtrl.id
  }

  getStudentSubjectList(student: Student): Subject[] {
    if (!student) { return this.subjectService.cachedSubjects }
    return this.subjectService.cachedSubjects.filter((subject: Subject) => {
      return student.classroom.subjects.some((subjectId: any) => subjectId === subject.id)
    })
  }

  toggleBooleanCrl(control: string): void {
    if (!this.dayFormGroup.dirty) { this.dayFormGroup.markAsDirty() }
    const formCtrl = this.dayFormGroup.get(control)
    formCtrl.setValue(!formCtrl.value)
  }

  save(): void {
    // If save, mark dayContentCtrl as touched for error control in ckeditor
    this.dayFormGroup.controls.dayStudentCtrl.markAsTouched()

    if (this.dayFormGroup.valid && (
      (this.data.idDay && !this.dayFormGroup.pristine) || // Edit && pristine
      (!this.data.idDay) // Create or Clone
    )) {

      const day = this.dayService.normalizeDay({
        studentId: this.getStudentId(),
        date: this.dayFormGroup.value.dayDateCtrl,
        title: this.dayFormGroup.value.dayTitleCtrl,
        subjectId: this.dayFormGroup.value.daySubjectCtrl,
        content: this.dayFormGroup.value.dayContentCtrl,
        favorite: this.dayFormGroup.value.dayFavoriteCtrl,
        archived: this.dayFormGroup.value.dayArchivedCtrl,
      })

      let setDay: any
      if (this.data.idDay) {
        setDay = this.dayService.updateDay(this.data.idDay, day)
      } else {
        setDay = this.dayService.createDay(day)
      }

      setDay
        .then((result: DocumentReference) => {
          this.dialogRef.close(result)

          if (result && result.id) {// Create
            this.toastService.success({
              text: 'MSG.DAY_CREATE_OK',
              navigate: { text: 'SEE', route: ['classroom/day', result.id] }
            })
          } else {// Modify
            const routeId = this.router.url.match(UtilService.regExp.idInUrl)
            if (routeId && routeId[1] === this.data.idDay) {
              this.toastService.success({ text: 'MSG.DAY_UPDATE_OK' })
            } else {
              this.toastService.success({
                text: 'MSG.DAY_UPDATE_OK',
                navigate: { text: 'SEE', route: ['classroom/day', this.data.idDay] }
              })
            }
          }
        })
        .catch((err: any) => {
          this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
        })
    } else if (this.data.idDay && this.dayFormGroup.valid) {// If Edit and valid
      this.dialogRef.close()
    } else if (this.dayFormGroup.invalid) { // ScrollTop if errors
      document.querySelector('section.dialog-content').scrollTop = 0
    }
  }

  cancel(): void {
    if (this.dayFormGroup.dirty) {
      if (confirm(this.translateService.instant('MSG.WILL_LOSE_THE_CHANGES'))) {
        this.dialogRef.close()
      }
    } else {
      this.dialogRef.close()
    }
  }
}
