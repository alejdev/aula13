import * as Hammer from 'hammerjs'
import { Observable, Subscription } from 'rxjs'
import { SettingService } from 'src/app/shared/services/setting.service'
import { ThemeService } from 'src/app/shared/services/theme.service'

import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { Event, NavigationStart, Router } from '@angular/router'

@Component({
  selector: 'a13-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit, OnDestroy {

  @HostBinding('class') componentCssClass: string
  @ViewChild(MatSidenav, { static: true }) sideMenu: MatSidenav

  routerSubscription: Subscription
  themeSubscription: Subscription
  sidenavStatus$: Observable<any>

  public sidenavOpened: boolean
  public mobileQueryL: MediaQueryList

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private themeService: ThemeService,
    private settingService: SettingService
  ) { }

  ngOnInit(): void {

    // Event listender for toggle menu on mobile
    this.mobileQueryL = window.matchMedia('(max-width: 1280px)')

    // Swipe sideMenu on mobile
    if (this.settingService.value.canPanSideMenu) {
      const mc = new Hammer.Manager(this.elementRef.nativeElement, {})
      mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 }))
      mc.on('panright', (ev: any) => this.sideMenu.open())
      mc.on('panleft', (ev: any) => this.sideMenu.close())
    }

    this.sidenavStatus$ = this.sideMenu.openedChange

    // Storage settings on first time
    this.settingService.value = this.settingService.value

    // Detecting Router Changes
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart && this.mobileQueryL.matches) {
        this.sideMenu.close()
      }
    })

    // Theming service
    this.themeSubscription = this.themeService.theme.subscribe((theme: any) => {
      this.componentCssClass = theme.id
    })

    // Set setting theme on first time
    this.themeService.setTheme(this.settingService.value.theme)

    // set document height
    this.setDocHeight()
    addEventListener('resize', this.setDocHeight)
    addEventListener('orientationchange', this.setDocHeight)
  }

  setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe()
    this.themeSubscription.unsubscribe()
  }
}
