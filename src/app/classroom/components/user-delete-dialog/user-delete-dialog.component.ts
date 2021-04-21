

import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'

import { UserService } from '../../services/user.service'

@Component({
  selector: 'a13-user-delete-dialog',
  templateUrl: '../templates/simple-dialog.template.html',
  styleUrls: ['./user-delete-dialog.component.scss']
})
export class UserDeleteDialogComponent implements OnInit {

  textConfig: any

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<UserDeleteDialogComponent>
  ) { }

  ngOnInit(): void {
    this.textConfig = {
      title: 'DELETE_ACCOUNT.TITLE',
      msg: 'DELETE_ACCOUNT.MSG',
      msg2: 'DELETE_ACCOUNT.MSG_2',
      okButton: 'DELETE',
      okButtonColor: 'warn'
    }
  }

  ok(): void {
    this.userService.deleteUserAccount()
  }

  cancel(): void {
    this.dialogRef.close()
  }

}
