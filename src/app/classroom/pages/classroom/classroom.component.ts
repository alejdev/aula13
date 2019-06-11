import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core'
import { Event, NavigationStart, Router } from '@angular/router'
import { OverlayContainer } from '@angular/cdk/overlay'

import * as Hammer from 'hammerjs'

import { MatSidenav } from '@angular/material/sidenav'

import { SidenavService } from 'src/app/classroom/services/sidenav.service'
import { ThemeService } from 'src/app/shared/services/theme.service'
import { onMainContentChange, onSideNavChange } from 'src/app/classroom/animations/animations'

@Component({
  selector: 'a13-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
  animations: [onSideNavChange, onMainContentChange]
})
export class ClassroomComponent implements OnInit {

  @HostBinding('class') componentCssClass: string
  @ViewChild(MatSidenav, { static: true }) sideMenu: MatSidenav

  onSideNavChange: boolean
  animStyles: any
  mobileQuery: MediaQueryList

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private sidenavService: SidenavService,
    private overlayContainer: OverlayContainer,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
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
    this.themeService.theme.subscribe((result: any) => {
      const overlay = this.overlayContainer.getContainerElement().classList
      const prevTheme = this.themeService.previousTheme
      if (prevTheme) {
        overlay.remove(prevTheme.id)
      }
      overlay.add(result.id)
      this.componentCssClass = result.id
    })

    // Sidenav service
    this.sidenavService.sidenavState.subscribe(result => this.onSideNavChange = result)
    this.setViewportSize()
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
}
