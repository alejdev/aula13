import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'

import { DayService } from '../../services/day.service'

@Component({
  selector: 'a13-day-delete-dialog',
  templateUrl: './day-delete-dialog.component.html',
  styleUrls: ['./day-delete-dialog.component.scss']
})
export class DayDeleteDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private dayService: DayService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<DayDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ok(): void {
    this.dayService.deleteDay(this.data.idDay)
      .then((result: any) => {
        this.dialogRef.close(this.data.day)
        this.toastService.success('MSG.DAY_DELETE_OK')
      })
      .catch((err: any) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      })
  }

}
