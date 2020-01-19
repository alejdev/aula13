import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { ToastService } from 'src/app/shared/services/toast.service'
import { SubjectService } from '../../services/subject.service'

@Component({
  selector: 'a13-subject-creation',
  templateUrl: './subject-creation.component.html',
  styleUrls: ['./subject-creation.component.scss']
})
export class SubjectCreationComponent implements OnInit {

  subjectFormGroup: FormGroup
  equals: any
  srcImage: any
  subject: any

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private subjectService: SubjectService,
    private dialogRef: MatDialogRef<SubjectCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.subject = this.data.entity

    // Init form controls
    this.subjectFormGroup = this.formBuilder.group({
      nameCtrl: [this.subject.name || '', Validators.required]
    })
  }

  save(): void {
    if (this.subjectFormGroup.valid) {
      const subject = {
        name: this.subjectFormGroup.value.nameCtrl || ''
      }
      let createSubject: any
      if (this.data.idEntity) {
        createSubject = this.subjectService.updateSubject(this.data.idEntity, subject)
      } else {
        createSubject = this.subjectService.createSubject(subject)
      }
      createSubject
        .then((result: any) => {
          this.toastService.success(`MSG.SUBJECT_${this.data.idEntity ? 'UPDATE' : 'CREATE'}_OK`)
          this.dialogRef.close(this.data.entity)
        })
        .catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        })
    }
  }
}