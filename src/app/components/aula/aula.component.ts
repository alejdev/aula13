import { Component, OnInit } from '@angular/core';
import { onMainContentChange, onSideNavChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'a13-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
  animations: [onSideNavChange, onMainContentChange]
})
export class AulaComponent implements OnInit {

  onSideNavChange: boolean
  fixedTopGap: number
  animStyles: any
  mobileQuery: MediaQueryList
  mobileQueryListener: () => void

  constructor(private sidenavService: SidenavService, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this.mobileQueryListener = () => this.setViewportSize()
    this.mobileQuery.addListener(this.mobileQueryListener)
  }

  setViewportSize() {
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

  ngOnInit() {
    this.sidenavService.sidenavState.subscribe(res => {
      this.onSideNavChange = res;
    })
    this.setViewportSize()
  }
}