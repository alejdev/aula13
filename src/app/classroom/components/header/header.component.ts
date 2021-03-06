import { Subscription } from 'rxjs'
import { HeaderConfig, LogoConfig, ThemeElement, User } from 'src/app/core/interfaces'
import { DIALOG_CONFIG } from 'src/app/core/settings'
import { TypeOfPipe } from 'src/app/shared/pipes/type-of.pipe'
import { ThemeService } from 'src/app/shared/services/theme.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { Router } from '@angular/router'

import { HeaderService } from '../../services/header.service'
import { UserService } from '../../services/user.service'
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component'

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TypeOfPipe]
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User
  themeName: string
  headerConfig: any
  isTruncated: boolean

  themeConfig$: Subscription
  headerConfig$: Subscription

  logoConfig: LogoConfig = {
    color: 'transparent',
    shake: true,
  }

  menuProfile: any = [{
    name: 'PROFILE',
    icon: 'user',
    action: () => this.router.navigate(['/classroom/profile'])
  }, {
    name: 'SETTINGS',
    icon: 'cog',
    action: () => this.router.navigate(['/classroom/settings'])
  },
  { divider: true },
  {
    name: 'SIGN.OUT',
    icon: 'sign-out-alt',
    action: () => this.dialog.open(LogoutDialogComponent, { ...DIALOG_CONFIG })
  }]

  constructor(
    private themeService: ThemeService,
    private headerService: HeaderService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<any> {

    // Get theme
    this.themeConfig$ = this.themeService.theme.subscribe((result: ThemeElement) => {
      this.themeName = result.isDark ? '' : 'primary'
    })

    // Header config
    this.headerConfig$ = this.headerService.config.subscribe((config: HeaderConfig) => {
      this.headerConfig = config
      this.isTruncated = true
      this.logoConfig.showLogo = config.showLogo
    })

    this.user = await this.userService.readUser()
  }

  openDialog(component: any, config: MatDialogConfig) {
    if (component && config) {
      this.dialog.open(component, config)
    }
  }

  truncate() {
    if (this.headerConfig.truncable) {
      this.isTruncated = !this.isTruncated
    }
  }

  goBack() {
    if (this.headerConfig.backTo) {
      this.router.navigate(this.headerConfig.backTo.path, this.headerConfig.backTo.extras)
    } else {
      window.history.back()
    }
  }

  ngOnDestroy(): void {
    this.themeConfig$.unsubscribe()
    this.headerConfig$.unsubscribe()
  }
}
