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

  title = 'Aula 13'
  @Input() sidenav: any
  mobileQueryS: MediaQueryList
  themeName: any
  sidenavState: boolean

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

    // Get sidenav state
    this.sidenavService.sidenavState.subscribe(result => this.sidenavState = result)
  }

  toggleSinenav(): void {
    if (this.mobileQueryS.matches) {
      this.sidenav.toggle()
    } else {
      this.sidenavService.sidenavState.next(!this.sidenavService.sidenavState.value)
    }
  }

  logOut(): void {
    this.dialog.open(LogoutDialogComponent)
  }
}
