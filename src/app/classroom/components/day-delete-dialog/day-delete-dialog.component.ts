import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { DayService } from '../../services/day.service'

@Component({
  selector: 'a13-day-delete-dialog',
  templateUrl: '../templates/simple-dialog.template.html',
  styleUrls: ['./day-delete-dialog.component.scss']
})
export class DayDeleteDialogComponent implements OnInit {

  textConfig: any

  constructor(
    private dayService: DayService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<DayDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.textConfig = {
      title: 'DAY.DELETE',
      msg2: 'MSG.DAY_DELETE',
      okButton: 'DELETE',
      okButtonColor: 'warn'
    }
  }

  ok(): void {
    this.dayService.deleteDay(this.data.day.id)
      .then(() => {
        this.dialogRef.close()
        this.toastService.success({ text: 'MSG.DAY_DELETE_OK' })
      })
      .catch((err: any) => {
        this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
      })
  }

  cancel(): void {
    this.dialogRef.close()
  }

}
