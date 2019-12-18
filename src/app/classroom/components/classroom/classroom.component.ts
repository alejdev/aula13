import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core'
import { Event, NavigationStart, Router } from '@angular/router'

import * as Hammer from 'hammerjs'

import { MatSidenav } from '@angular/material/sidenav'

import { onMainContentChange, onSideNavChange } from 'src/app/classroom/classroom.animation'
import { SidenavService } from 'src/app/classroom/services/sidenav.service'
import { ThemeService } from 'src/app/shared/services/theme.service'
import { SettingService } from 'src/app/shared/services/setting.service'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'a13-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
  animations: [onSideNavChange, onMainContentChange]
})
export class ClassroomComponent implements OnInit {

  @HostBinding('class') componentCssClass: string
  @ViewChild(MatSidenav, { static: true }) sideMenu: MatSidenav

  public animStyles: any
  public onSideNavChange: boolean
  public mobileQueryS: MediaQueryList
  public mobileQueryM: MediaQueryList

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private settingService: SettingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Set User Logged
    this.setUserLogged()

    // Event listender for toggle menu on mobile
    this.mobileQueryS = window.matchMedia('(max-width: 600px)')
    this.mobileQueryM = window.matchMedia('(min-width: 601px) and (max-width: 900px)')

    /* tslint:disable */
    this.mobileQueryS.addListener((e) => this.setViewportSize())
    this.mobileQueryM.addListener((e) => this.setViewportSize())
    /* tslint:enable */

    // Swipe sideMenu on mobile
    if (this.settingService.value.canPanSideMenu) {
      const mc = new Hammer.Manager(this.elementRef.nativeElement, {})
      mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 }))
      mc.on('panright', (ev: any) => this.mobileQueryS.matches ? this.sideMenu.open() : 0)
      mc.on('panleft', (ev: any) => this.mobileQueryS.matches ? this.sideMenu.close() : 0)
    }

    // Detecting Router Changes
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // If mobile, side-menu will close when navigate
        if (this.mobileQueryS.matches) {
          this.sideMenu.close()
        }
      }
    })

    // Theming service
    this.themeService.theme.subscribe((theme: any) => {
      this.componentCssClass = theme.id
    })

    // Set setting theme on first time
    this.themeService.setTheme(this.settingService.value.theme)

    // Sidenav service
    this.sidenavService.sidenavState.subscribe(result => this.onSideNavChange = result)
    this.setViewportSize()
  }

  setUserLogged(): void {
    this.authService.readUser(this.authService.getUserUid())
      .then((result) => {
        this.authService.setUserLogged(result.data())
      })
  }

  setViewportSize(): void {
    if (this.mobileQueryS.matches) {
      this.sidenavService.sidenavState.next(true)
      this.animStyles = this.setAnimStyle('S')
    } else if (this.mobileQueryM.matches) {
      this.sidenavService.sidenavState.next(false)
      setTimeout(() => {
        const mainContent = document.querySelector('#main-content-container')
        const style = mainContent.getAttribute('style')
        if (style.indexOf('60px') == -1) {
          mainContent.setAttribute('style', 'margin-left: 60px')
        }
      }, 100)
      this.animStyles = this.setAnimStyle('M')
    } else {
      this.sidenavService.sidenavState.next(true)
      this.animStyles = this.setAnimStyle('M')
    }
  }

  setAnimStyle(media: string): any {
    if (media === 'S') {
      return {
        open: { width: '220px', left: '0px' },
        close: { width: '0px', left: '0px' }
      }
    }
    return {
      open: { width: '220px', left: '220px' },
      close: { width: '60px', left: '60px' }
    }
  }

}
