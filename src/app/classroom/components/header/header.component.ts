import { Component, Input, OnInit } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'

import { MatDialog } from '@angular/material'

import { SidenavService } from 'src/app/classroom/services/sidenav.service'
import { ThemeService } from 'src/app/shared/services/theme.service'

import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component'

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobileQueryS: MediaQueryList
  themeName: any

  constructor(
    private media: MediaMatcher,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Set mediaQuery
    this.mobileQueryS = this.media.matchMedia('(max-width: 600px)')

    // Get theme
    this.themeService.theme.subscribe((result: any) => {
      this.themeName = result.isDark ? '' : 'primary'
    })
  }

  logOut(): void {
    this.dialog.open(LogoutDialogComponent)
  }
}
