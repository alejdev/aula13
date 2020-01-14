import { Component, OnInit } from '@angular/core'

import { MatDialog } from '@angular/material'

import { ThemeService } from 'src/app/shared/services/theme.service'
import { HeaderService } from '../../services/header.service'

import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component'

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  themeName: any
  headerConfig: any
  truncate: boolean = false

  constructor(
    private themeService: ThemeService,
    private dialog: MatDialog,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    // Get theme
    this.themeService.theme.subscribe((result: any) => {
      this.themeName = result.isDark ? '' : 'primary'
    })

    // Theming service
    this.headerService.config.subscribe((config: any) => {
      this.headerConfig = config
    })
  }

  edit(): void { }

  archive(): void {  }

  delete(): void { }

  logOut(): void {
    this.dialog.open(LogoutDialogComponent)
  }
}
