import '@ckeditor/ckeditor5-build-classic/build/translations/es'
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb'
import '@ckeditor/ckeditor5-build-classic/build/translations/de'
import '@ckeditor/ckeditor5-build-classic/build/translations/it'
import '@ckeditor/ckeditor5-build-classic/build/translations/fr'

import _moment, { default as _rollupMoment } from 'moment'
import { DayService } from 'src/app/classroom/services/day.service'
import { CKEDITOR_CONFIG } from 'src/app/core/core.module'
import { ToastService } from 'src/app/shared/services/toast.service'

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
      language: this.settingService.value.lang,
      placeholder: this.translateService.instant('FORM.DAY_EDITOR_PLACEHOLDER'),
      ...CKEDITOR_CONFIG,
    }

    // Init form controls
    this.dayFormGroup = this.formBuilder.group({
      dayStudentCtrl: [this.day.student, Validators.required],
      dayDateCtrl: [this.dayService.formatInputDate(this.day.date), Validators.required],
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

  getStudentId(): any {
    const dayStudentCtrl = this.dayFormGroup.value.dayStudentCtrl
    if (dayStudentCtrl.hasOwnProperty('studentCtrl')) {
      return dayStudentCtrl.studentCtrl.id
    }
    return dayStudentCtrl.id
  }

  save(): void {
    if (this.dayFormGroup.valid) {

      const day = this.dayService.normalizeDay({
        studentId: this.getStudentId(),
        date: this.dayFormGroup.value.dayDateCtrl,
        title: this.dayFormGroup.value.dayTitleCtrl,
        content: this.dayFormGroup.value.dayContentCtrl,
        favorite: this.day.favorite,
        archived: this.day.archived,
      })

      let setDay: any
      if (this.data.idDay) {
        setDay = this.dayService.updateDay(this.data.idDay, day)
      } else {
        setDay = this.dayService.createDay(day)
      }

      setDay
        .then((result: any) => {
          const routeId = this.router.url.match(/\/.*\/.*\/(.*)/)

          if (result && result.id) {// Create
            this.toastService.success({
              text: 'MSG.DAY_CREATE_OK',
              navigate: { text: 'SEE', route: ['aula/dia', result.id] }
            })
          } else {// Modify
            if (routeId && routeId[1] === this.data.idDay) {
              this.toastService.success({ text: 'MSG.DAY_UPDATE_OK' })
            } else {
              this.toastService.success({
                text: 'MSG.DAY_UPDATE_OK',
                navigate: { text: 'SEE', route: ['aula/dia', this.data.idDay] }
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
    if (this.dayFormGroup.dirty) {
      if (confirm(this.translateService.instant('MSG.WILL_LOSE_THE_CHANGES'))) {
        this.dialogRef.close()
      }
    } else {
      this.dialogRef.close()
    }
  }
}
