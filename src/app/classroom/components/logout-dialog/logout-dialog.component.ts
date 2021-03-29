import { Component, OnInit } from '@angular/core'

import { MatDialogRef } from '@angular/material/dialog'

import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'a13-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LogoutDialogComponent>
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  logout(): void {
    this.authService.signOut()
  }

}