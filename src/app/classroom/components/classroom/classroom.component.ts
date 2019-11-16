import { Component, ElementRef, HostBinding, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { Event, NavigationStart, Router } from '@angular/router'

import * as Hammer from 'hammerjs'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { AngularFirestore } from '@angular/fire/firestore'

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
export class ClassroomComponent implements OnInit, OnDestroy {

  @HostBinding('class') componentCssClass: string
  @ViewChild(MatSidenav, { static: true }) sideMenu: MatSidenav

  private mobileQuery: MediaQueryList
  private ngUnsubscribe = new Subject()
  private refCollection: string = 'users'
  public animStyles: any
  public onSideNavChange: boolean

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private settingService: SettingService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    // Set User Logged
    this.setUserLogged()

    // Event listender for toggle menu on mobile
    this.mobileQuery = window.matchMedia('(max-width: 600px)')

    // tslint:disable-next-line:deprecation
    this.mobileQuery.addListener((e) => this.setViewportSize())

    // Swipe sideMenu on mobile
    const mc = new Hammer.Manager(this.elementRef.nativeElement, {})
    mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 }))
    mc.on('panright', (ev: any) => this.mobileQuery.matches ? this.sideMenu.open() : 0)
    mc.on('panleft', (ev: any) => this.mobileQuery.matches ? this.sideMenu.close() : 0)

    // Detecting Router Changes
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // If mobile, side-menu will close when navigate
        if (this.mobileQuery.matches) {
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

  setUserLogged() {
    this.firestore.collection(
      this.refCollection,
      ref => ref.where('id', '==', this.authService.getUserUid()).limit(1)
    )
      .valueChanges()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((users: any) => {
        if (users[0]) {
          this.authService.setUserLogged(users[0])
        }
      })
  }

  setViewportSize(): void {
    if (this.mobileQuery.matches) {
      this.sidenavService.sidenavState.next(true)
      this.animStyles = {
        open: { width: '220px', left: '0px' },
        close: { width: '0px', left: '0px' }
      }
    } else {
      this.sidenavService.sidenavState.next(true)
      this.animStyles = {
        open: { width: '220px', left: '220px' },
        close: { width: '60px', left: '60px' }
      }
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
