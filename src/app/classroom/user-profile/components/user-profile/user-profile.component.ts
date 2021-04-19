import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserDeleteDialogComponent } from 'src/app/classroom/components/user-delete-dialog/user-delete-dialog.component'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { UserService } from 'src/app/classroom/services/user.service'
import { User } from 'src/app/core/interfaces'
import { DIALOG_CONFIG, SKELETON_CONFIG } from 'src/app/core/settings'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { DocumentReference } from '@angular/fire/firestore'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User
  userOriginal: User
  user$: Subscription

  userFormGroup: FormGroup
  passwordType = 'password'

  skeleton: any = SKELETON_CONFIG

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private headerService: HeaderService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.headerService.configHeader({ title: 'PROFILE', back: true, showLogo: true, showProfile: true })

    this.user$ = this.userService.observeUser().pipe(
      map((result) => UtilService.mapDocument(result))
    ).subscribe((userData: User) => {
      this.user = userData
      this.userOriginal = UtilService.clone(userData)
      this.initForm(userData)
    })
  }

  initForm(userData: User): void {
    if (userData) {
      this.userFormGroup = this.formBuilder.group({
        userAvatarCtrl: [userData.avatar],
        userNameCtrl: [userData.name, Validators.required],
      })
    }
  }

  changeAvatar(): void {

  }

  save(userData: User) {
    if (this.userFormGroup.valid && !this.userFormGroup.pristine) {

      const user = {
        avatar: this.userFormGroup.value.userAvatarCtrl,
        creationDate: userData.creationDate,
        email: userData.email,
        id: userData.id,
        name: this.userFormGroup.value.userNameCtrl,
      }

      this.userService.updateUser(user)
        .then((result: DocumentReference) => {
          this.toastService.success({ text: 'MSG.USER_UPDATE_OK' })
          this.initForm(user)
          this.userFormGroup.markAsPristine()
        })
        .catch((err: any) => {
          this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
        })
    }
  }

  deleteAccount(): void {
    this.dialog.open(UserDeleteDialogComponent, {
      ...DIALOG_CONFIG
    })
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe()
  }

}
