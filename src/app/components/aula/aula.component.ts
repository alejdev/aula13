import { MediaMatcher } from '@angular/cdk/layout'
import { OverlayContainer } from '@angular/cdk/overlay'
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { Event, NavigationStart, Router } from '@angular/router'
import * as Hammer from 'hammerjs'
import { onMainContentChange, onSideNavChange } from 'src/app/animations/animations'
import { SidenavService } from 'src/app/services/sidenav.service'
import { ThemeService } from 'src/app/services/theme.service'

@Component({
  selector: 'a13-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
  animations: [onSideNavChange, onMainContentChange]
})
export class AulaComponent implements OnInit {

  @HostBinding('class') componentCssClass: string
  @ViewChild(MatSidenav, { static: true }) sideMenu: MatSidenav

  onSideNavChange: boolean
  animStyles: any
  mobileQuery: MediaQueryList

  constructor(elementRef: ElementRef, private sidenavService: SidenavService, media: MediaMatcher, private themeService: ThemeService, private overlayContainer: OverlayContainer, router: Router) {

    // Event listender for toggle menu on mobile
    this.mobileQuery = window.matchMedia('(max-width: 600px)')
    // tslint:disable-next-line:deprecation
    this.mobileQuery.addListener((e) => this.setViewportSize())

    // Swipe sideMenu on mobile
    const mc = new Hammer.Manager(elementRef.nativeElement, {})
    mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 }))
    mc.on('panright', (ev: any) => this.mobileQuery.matches ? this.sideMenu.open() : 0)
    mc.on('panleft', (ev: any) => this.mobileQuery.matches ? this.sideMenu.close() : 0)

    // Detecting Router Changes
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // If mobile, side-menu will close when navigate
        if (this.mobileQuery.matches) {
          this.sideMenu.close()
        }
      }
    })
  }

  ngOnInit(): void {
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
