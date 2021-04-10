import { Subscription } from 'rxjs'
import { DIALOG_CONFIG } from 'src/app/core/core.module'
import { TypeOfPipe } from 'src/app/shared/pipes/type-of.pipe'
import { ThemeService } from 'src/app/shared/services/theme.service'
import { ToastService } from 'src/app/shared/services/toast.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

import { HeaderService } from '../../services/header.service'
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component'
import { LogoConfig } from '../title-logo/title-logo.component'

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TypeOfPipe]
})
export class HeaderComponent implements OnInit, OnDestroy {

  themeName: any
  headerConfig: any
  isTruncated: boolean

  themeConfigSubscription: Subscription
  headerConfigSubscription: Subscription

  logoConfig: LogoConfig = {
    shake: true,
    color: 'transparent'
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
    this.themeConfigSubscription = this.themeService.theme.subscribe((result: any) => {
      this.themeName = result.isDark ? '' : 'primary'
    })

    // Header config
    this.headerConfigSubscription = this.headerService.config.subscribe((config: any) => {
      this.headerConfig = config
      this.isTruncated = true
      this.logoConfig.showLogo = config.showLogo
    })
  }

  openDialog(component: any, config: any) {
    if (component && config) {
      this.dialog.open(component, config)
    }
  }

  truncate() {
    if (this.headerConfig.truncable) {
      this.isTruncated = !this.isTruncated
    }
  }

  // toggleSearch() {
  //   this.headerService.toggleSearch()
  //   if (this.headerService.searchStatus) {
  //     setTimeout(() => { document.getElementById('searchInputFilter').focus() }, 300)
  //   }
  // }

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
