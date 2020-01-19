import { Component, OnInit, Inject } from '@angular/core'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { SubjectService } from '../../services/subject.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
  selector: 'a13-subject-delete-dialog',
  templateUrl: './subject-delete-dialog.component.html',
  styleUrls: ['./subject-delete-dialog.component.scss']
})
export class SubjectDeleteDialogComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<SubjectDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ok(): void {
    this.subjectService.deleteSubject(this.data.idEntity)
      .then((result: any) => {
        this.dialogRef.close(this.data.entity)
        this.toastService.success('MSG.SUBJECT_DELETE_OK')
      })
      .catch((err: any) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      })
  }

}
