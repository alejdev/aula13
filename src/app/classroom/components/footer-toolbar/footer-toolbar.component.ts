import { Component, Input, OnInit } from '@angular/core'

import { SidenavService } from 'src/app/classroom/services/sidenav.service'
import { MediaMatcher } from '@angular/cdk/layout'

@Component({
  selector: 'a13-footer-toolbar',
  templateUrl: './footer-toolbar.component.html',
  styleUrls: ['./footer-toolbar.component.scss']
})
export class FooterToolbarComponent implements OnInit {

  title = 'Aula 13'
  @Input() sidenav: any
  mobileQueryS: MediaQueryList
  themeName: any
  sidenavState: boolean

  toolbarItems: any = [{
    name: 'STUDENTS',
    url: 'alumnos',
    icon: 'user-graduate'
  }, {
    name: 'DAILY',
    url: 'diario',
    icon: 'calendar-day'
  }]

  constructor(
    private media: MediaMatcher,
    private sidenavService: SidenavService,
  ) { }

  ngOnInit(): void {
    // Set mediaQuery
    this.mobileQueryS = this.media.matchMedia('(max-width: 600px)')
  }

  toggleSinenav(): void {
    if (this.mobileQueryS.matches) {
      this.sidenav.toggle()
    } else {
      this.sidenavService.sidenavState.next(!this.sidenavService.sidenavState.value)
    }
  }
}
