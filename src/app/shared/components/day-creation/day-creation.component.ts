import { Component, OnInit, Inject } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/es'
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb'
import '@ckeditor/ckeditor5-build-classic/build/translations/de'
import '@ckeditor/ckeditor5-build-classic/build/translations/it'
import '@ckeditor/ckeditor5-build-classic/build/translations/fr'

import _moment from 'moment'
import { default as _rollupMoment } from 'moment'
const moment = _rollupMoment || _moment

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { DayService } from 'src/app/classroom/services/day.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { SettingService } from '../../services/setting.service'

@Component({
  selector: 'a13-day-creation',
  templateUrl: './day-creation.component.html',
  styleUrls: ['./day-creation.component.scss']
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

  onReady(editor: any): void {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )
  }

  setGroup(control: string, group: any): void {
    this.formGroup.value[control] = group.groupId
  }

  formatDate(date: any) {
    if (date) {
      return `${date._i.year}-${date._i.month + 1}-${date._i.date}`
    }
    return ''
  }

  save(): void {
    if (this.formGroup.valid) {
      const day = {
        student: this.formGroup.value.dayStudentCtrl,
        date: this.formatDate(this.formGroup.value.dayDateCtrl),
        title: this.formGroup.value.dayTitleCtrl,
        content: this.formGroup.value.dayTitleCtrl
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
