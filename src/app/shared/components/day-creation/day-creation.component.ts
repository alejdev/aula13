import '@ckeditor/ckeditor5-build-classic/build/translations/es'
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb'
import '@ckeditor/ckeditor5-build-classic/build/translations/de'
import '@ckeditor/ckeditor5-build-classic/build/translations/it'
import '@ckeditor/ckeditor5-build-classic/build/translations/fr'

import _moment, { default as _rollupMoment } from 'moment'
import { DayService } from 'src/app/classroom/services/day.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic'
import { TranslateService } from '@ngx-translate/core'

import { SettingService } from '../../services/setting.service'

const moment = _rollupMoment || _moment

@Component({
  selector: 'a13-day-creation',
  templateUrl: './day-creation.component.html',
  styleUrls: ['./day-creation.component.scss']
})
export class DayCreationComponent implements OnInit {

  day: any
  studentList: any[]
  dayFormGroup: FormGroup
  maxlengthTitle: number = 50
  ckeditor: any = DecoupledEditor
  editorConfig: any

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dayService: DayService,
    private toastService: ToastService,
    private settingService: SettingService,
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<DayCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.day = this.data.day
    this.editorConfig = {
      toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', '|', 'heading'],
      language: this.settingService.value.lang,
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
    }

    // Init form controls
    this.dayFormGroup = this.formBuilder.group({
      dayStudentCtrl: [this.day.student, Validators.required],
      dayDateCtrl: [this.formatInputDate(this.day.date), Validators.required],
      dayTitleCtrl: [this.day.title, Validators.required],
      dayContentCtrl: [this.day.content, Validators.required],
    })
  }

  onReady(editor: any): void {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )
  }

  formatInputDate(date: any): any {
    if (date) {
      return moment(new Date(date), 'DD/MM/YYYY')
    }
    return moment(UtilService.today(), 'DD/MM/YYYY')
  }

  formatOutputDate(date: any): any {
    if (date && date._isAMomentObject && date._isValid) {
      return moment(date, 'DD/MM/YYYY').unix() * 1000
    }
    return ''
  }

  getStudentId(): any {
    const dayStudentCtrl = this.dayFormGroup.value.dayStudentCtrl
    if (dayStudentCtrl.hasOwnProperty('studentCtrl')) {
      return dayStudentCtrl.studentCtrl.id
    }
    return dayStudentCtrl.id
  }

  save(): void {
    if (this.dayFormGroup.valid) {

      const day = {
        studentId: this.getStudentId(),
        date: this.formatOutputDate(this.dayFormGroup.value.dayDateCtrl),
        title: UtilService.capitalize(this.dayFormGroup.value.dayTitleCtrl),
        content: this.dayFormGroup.value.dayContentCtrl
      }

      let setDay: any
      if (this.data.idDay) {
        setDay = this.dayService.updateDay(this.data.idDay, day)
      } else {
        setDay = this.dayService.createDay(day)
      }

      setDay
        .then((result: any) => {
          this.toastService.success(`MSG.DAY_${this.data.idDay ? 'UPDATE' : 'CREATE'}_OK`)
          this.dialogRef.close(this.data.day)
          // Go to profile when create
          if (result && result.id) {
            this.router.navigate(['aula/dia', result.id])
          }
        })
        .catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        })
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
