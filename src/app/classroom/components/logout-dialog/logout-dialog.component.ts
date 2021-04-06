import { AuthService } from 'src/app/shared/services/auth.service'

import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'a13-logout-dialog',
  templateUrl: '../templates/simple-dialog.template.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  textConfig: any

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LogoutDialogComponent>
  ) { }

  ngOnInit(): void {
    this.textConfig = {
      title: 'MSG.LOGOUT',
      msg2: 'MSG.LOGOUT_CONFIRM',
      okButton: 'SIGN.OUT'
    }
  }

  cancel(): void {
    this.dialogRef.close()
  }

  ok(): void {
    this.authService.signOut()
  }

}
