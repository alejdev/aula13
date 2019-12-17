import { Component, OnInit, Inject } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/es'
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb'
import '@ckeditor/ckeditor5-build-classic/build/translations/de'
import '@ckeditor/ckeditor5-build-classic/build/translations/it'
import '@ckeditor/ckeditor5-build-classic/build/translations/fr'

import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material'
import _moment from 'moment'
import { default as _rollupMoment } from 'moment'
const moment = _rollupMoment || _moment

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { DayService } from 'src/app/classroom/services/day.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { SettingService } from '../../services/setting.service'

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM, YYYY',
  },
  display: {
    dateInput: 'DD MMM, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'a13-day-creation',
  templateUrl: './day-creation.component.html',
  styleUrls: ['./day-creation.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DayCreationComponent implements OnInit {

  day: any
  studentList: any[]

  equals: any
  srcImage: any
  formGroup: FormGroup
  maxlengthTitle: number = 50
  ckeditor: any = DecoupledEditor
  editorConfig: any

  constructor(
    private formBuilder: FormBuilder,
    private dayService: DayService,
    private studentService: StudentService,
    private toastService: ToastService,
    private settingService: SettingService,
    private dialogRef: MatDialogRef<DayCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.day = this.data.day
    this.studentList = this.studentService.getCachedStudentList()
    this.equals = UtilService.equals
    this.srcImage = UtilService.srcImage

    // Init form controls
    this.formGroup = this.formBuilder.group({
      dayStudentCtrl: [this.day.student, Validators.required],
      dayDateCtrl: [moment().toISOString(), Validators.required],
      dayTitleCtrl: [this.day.title, Validators.required],
      dayContentCtrl: [this.day.content, Validators.required],
    })

    this.editorConfig = {
      toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', '|', 'heading'],
      language: this.settingService.value.lang,
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
    }
  }

  onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )
  }

  setGroup(control: string, group: any): void {
    this.formGroup.value[control] = group.groupId
  }

  save() {
    if (this.formGroup.valid) {
      const day = {
        name: this.formGroup.value.dayTitleCtrl,
        age: this.formGroup.value.dayContentCtrl,
        academicCourse: this.formGroup.value.dayStudentCourseCtrl,
      }
      let createDay: any
      if (this.data.idDay) {
        createDay = this.dayService.updateDay(this.data.idDay, day)
      } else {
        createDay = this.dayService.createDay(day)
      }
      createDay
        .then((result: any) => {
          this.toastService.info(`MSG.DAY_${this.data.idDay ? 'UPDATE' : 'CREATE'}_OK`)
          this.dialogRef.close(this.data.day)
        })
        .catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        })
    }
  }
}
