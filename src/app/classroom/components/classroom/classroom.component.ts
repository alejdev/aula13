import { Observable, Subscription } from 'rxjs'
import { OPACITY, SLIDE_LEFT, SLIDE_RIGHT } from 'src/app/core/animations'
import { ThemeElement } from 'src/app/core/interfaces'
import { SettingService } from 'src/app/shared/services/setting.service'
import { ThemeService } from 'src/app/shared/services/theme.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { transition, trigger } from '@angular/animations'
import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { Event, NavigationStart, Router, RouterOutlet } from '@angular/router'

@Component({
  selector: 'a13-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('students => daily', SLIDE_RIGHT),
      transition('daily => students', SLIDE_LEFT),
      transition('* => *', OPACITY),
    ])
  ]
})
export class ClassroomComponent implements OnInit, OnDestroy {

  @HostBinding('class') componentCssClass: string
  @ViewChild(MatSidenav, { static: true }) sideMenu: MatSidenav

  routerSubscription: Subscription
  themeSubscription: Subscription
  sidenavStatus$: Observable<any>

  public sidenavOpened: boolean
  public mobileQueryL: MediaQueryList

  selectedTab: number
  tabCount: number = 2
  swipeCoord: [number, number]
  swipeTime: number

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private settingService: SettingService
  ) { }

  ngOnInit(): void {

    // Event listender for toggle menu on mobile
    this.mobileQueryL = window.matchMedia('(max-width: 1280px)')

    this.sidenavStatus$ = this.sideMenu.openedChange

    // Storage settings on first time
    this.settingService.value = this.settingService.value

    // Select default tab
    this.setCurrentTab()

    // Detecting Router Changes
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      this.setCurrentTab()
      if (event instanceof NavigationStart && this.mobileQueryL.matches) {
        this.sideMenu.close()
      }
    })

    // Theming service
    this.themeSubscription = this.themeService.theme.subscribe((theme: ThemeElement) => {
      this.componentCssClass = theme.id
    })

    // Set setting theme on first time
    this.themeService.setTheme(this.settingService.value.theme)

    // set document height
    this.setDocHeight()
    addEventListener('resize', this.setDocHeight)
    addEventListener('orientationchange', this.setDocHeight)
  }

  setCurrentTab(): void {
    this.selectedTab = UtilService.regExp.dayListUrl.test(this.router.url) ? 1 : 0
  }

  prepareRouteTransition(outlet: RouterOutlet): string {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animation
  }

  setDocHeight(): void {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
    const time = new Date().getTime()
    if (when === 'start') {
      this.swipeCoord = coord
      this.swipeTime = time
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]]
      const duration = time - this.swipeTime
      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous'
        if (swipe === 'next') {
          if (this.settingService.value.canSlideSideMenu && this.sideMenu.opened && this.mobileQueryL.matches) {
            this.sideMenu.close()
          } else if (this.settingService.value.canSlideRoutes && UtilService.regExp.listsUrl.test(this.router.url) && this.selectedTab < this.tabCount - 1) {
            this.selectedTab = this.selectedTab === 0 ? 1 : this.selectedTab + 1
            this.router.navigate(['classroom/daily'])
          }
        } else if (swipe === 'previous') {
          if (this.settingService.value.canSlideSideMenu && !this.sideMenu.opened && this.mobileQueryL.matches && this.selectedTab === 0) {
            this.sideMenu.open()
          } else if (this.settingService.value.canSlideRoutes && UtilService.regExp.listsUrl.test(this.router.url) && this.selectedTab >= 1) {
            this.selectedTab = this.selectedTab - 1
            this.router.navigate(['classroom/students'])
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe()
    this.themeSubscription.unsubscribe()
  }
}
