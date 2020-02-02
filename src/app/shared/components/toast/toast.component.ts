import { Component, OnInit, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material'

@Component({
  selector: 'a13-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(
    private snackRef: MatSnackBarRef<ToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  case(messageType: string): boolean {
    const reg = RegExp('success|info|warning|error', 'g')
    return reg.test(messageType)
  }

  close() {
    this.snackRef.dismiss()
  }

}
