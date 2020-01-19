import { Component, OnInit, Inject } from '@angular/core'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { ClassroomService } from '../../services/classroom.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
  selector: 'a13-classroom-delete-dialog',
  templateUrl: './classroom-delete-dialog.component.html',
  styleUrls: ['./classroom-delete-dialog.component.scss']
})
export class ClassroomDeleteDialogComponent implements OnInit {

  constructor(
    private classroomService: ClassroomService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<ClassroomDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ok(): void {
    this.classroomService.deleteClassroom(this.data.idEntity)
      .then((result: any) => {
        this.dialogRef.close(this.data.entity)
        this.toastService.success('MSG.CLASSROOM_DELETE_OK')
      })
      .catch((err: any) => {
        this.toastService.error('ERR.UNEXPECTED_ERROR')
      })
  }
}
