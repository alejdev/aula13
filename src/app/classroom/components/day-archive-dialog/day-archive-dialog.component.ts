import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { DayService } from '../../services/day.service'

@Component({
  selector: 'a13-day-archive-dialog',
  templateUrl: './day-archive-dialog.component.html',
  styleUrls: ['./day-archive-dialog.component.scss']
})
export class DayArchiveDialogComponent implements OnInit {

  day: any
  textConfig: any

  constructor(
    private dayService: DayService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<DayArchiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.day = this.data.day
    this.textConfig = {
      title: `${!this.day.archived ? '' : 'UN'}ARCHIVE_DAY`,
      msg: `MSG.DAY_${!this.day.archived ? '' : 'UN'}ARCHIVE`,
      msg2: `MSG.DAY_${!this.day.archived ? '' : 'UN'}ARCHIVE_2`,
      okButton: `${!this.day.archived ? '' : 'UN'}ARCHIVE`,
      msgOk: `MSG.DAY_${!this.day.archived ? '' : 'UN'}ARCHIVED_OK`
    }
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ok(): void {
    this.day.archived = !this.day.archived
    this.dayService.updateDay(this.data.idDay, this.day)
      .then((result: any) => {
        this.dialogRef.close(this.data.day)
        this.toastService.success({ text: this.textConfig.msgOk })
      })
      .catch((err: any) => {
        this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
      })
  }

}
