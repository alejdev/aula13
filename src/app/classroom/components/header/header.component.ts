import { Subscription } from 'rxjs'
import { ThemeService } from 'src/app/shared/services/theme.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'

import { HeaderService } from '../../services/header.service'

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  themeName: any
  headerConfig: any
  isTruncated: boolean

  themeConfigSubscription: Subscription
  headerConfigSubscription: Subscription

  constructor(
    private themeService: ThemeService,
    private headerService: HeaderService,
    private dialog: MatDialog
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

  ngOnDestroy(): void {
    this.themeConfigSubscription.unsubscribe()
    this.headerConfigSubscription.unsubscribe()
  }
}
