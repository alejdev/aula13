import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { onMainContentChange, onSideNavChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MediaMatcher } from '@angular/cdk/layout';
import * as Hammer from 'hammerjs';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'a13-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
  animations: [onSideNavChange, onMainContentChange]
})
export class AulaComponent implements OnInit {

  @ViewChild(MatSidenav)
  public sideMenu: MatSidenav

  onSideNavChange: boolean
  fixedTopGap: number
  animStyles: any
  mobileQuery: MediaQueryList
  mobileQueryListener: () => void

  constructor(elementRef: ElementRef, private sidenavService: SidenavService, media: MediaMatcher) {

    // Event listender for toggle menu on mobile
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this.mobileQueryListener = () => this.setViewportSize()
    this.mobileQuery.addListener(this.mobileQueryListener)

    // Swipe sideMenu on mobile
    const hammertime = new Hammer(elementRef.nativeElement, {});
    hammertime.on('panright', (ev) => this.mobileQuery.matches ? this.sideMenu.open() : 0)
    hammertime.on('panleft', (ev) => this.mobileQuery.matches ? this.sideMenu.close() : 0)
  }

  setViewportSize(): void {
    if (this.mobileQuery.matches) {
      this.fixedTopGap = 54
      this.animStyles = {
        open: {
          width: '220px',
          left: '0px'
        },
        close: {
          width: '0px',
          left: '0px'
        }
      }
      this.sidenavService.sidenavState.next(true)
    } else {
      this.fixedTopGap = 64
      this.animStyles = {
        open: {
          width: '220px',
          left: '220px'
        },
        close: {
          width: '60px',
          left: '60px'
        }
      }
      this.sidenavService.sidenavState.next(true)
    }
  }

  ngOnInit(): void {
    this.sidenavService.sidenavState.subscribe(res => {
      this.onSideNavChange = res;
    })
    this.setViewportSize()
  }
}