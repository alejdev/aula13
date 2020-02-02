import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core'
import { Event, NavigationStart, Router } from '@angular/router'

import * as Hammer from 'hammerjs'

import { MatSidenav } from '@angular/material/sidenav'

import { ThemeService } from 'src/app/shared/services/theme.service'
import { SettingService } from 'src/app/shared/services/setting.service'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'a13-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  @HostBinding('class') componentCssClass: string
  @ViewChild(MatSidenav, { static: true }) sideMenu: MatSidenav

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private themeService: ThemeService,
    private settingService: SettingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    // Swipe sideMenu on mobile
    if (this.settingService.value.canPanSideMenu) {
      const mc = new Hammer.Manager(this.elementRef.nativeElement, {})
      mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 }))
      mc.on('panright', (ev: any) => this.sideMenu.open())
      mc.on('panleft', (ev: any) => this.sideMenu.close())
    }

    // Detecting Router Changes
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.sideMenu.close()
      }
    })

    // Theming service
    this.themeService.theme.subscribe((theme: any) => {
      this.componentCssClass = theme.id
    })

    // Set setting theme on first time
    this.themeService.setTheme(this.settingService.value.theme)
  }
}
