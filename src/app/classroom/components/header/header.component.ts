import { Subscription } from 'rxjs'
import { HeaderConfig, LogoConfig, ThemeElement } from 'src/app/core/interfaces'
import { DIALOG_CONFIG } from 'src/app/core/settings'
import { TypeOfPipe } from 'src/app/shared/pipes/type-of.pipe'
import { ThemeService } from 'src/app/shared/services/theme.service'
import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { Router } from '@angular/router'

import { HeaderService } from '../../services/header.service'
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component'

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TypeOfPipe]
})
export class HeaderComponent implements OnInit, OnDestroy {

  themeName: string
  headerConfig: any
  isTruncated: boolean

  themeConfigSubscription: Subscription
  headerConfigSubscription: Subscription

  logoConfig: LogoConfig = {
    color: 'transparent',
    shake: true,
  }

  menuProfile: any = [{
    name: 'PROFILE',
    icon: 'user',
    action: () => this.toastService.info({ text: 'MSG.SERVICE_NOT_AVAILABLE' })
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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    // Get theme
    this.themeConfigSubscription = this.themeService.theme.subscribe((result: ThemeElement) => {
      this.themeName = result.isDark ? '' : 'primary'
    })

    // Header config
    this.headerConfigSubscription = this.headerService.config.subscribe((config: HeaderConfig) => {
      this.headerConfig = config
      this.isTruncated = true
      this.logoConfig.showLogo = config.showLogo
    })
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
    this.themeConfigSubscription.unsubscribe()
    this.headerConfigSubscription.unsubscribe()
  }
}
