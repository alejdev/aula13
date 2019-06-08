import { Component, Input, OnInit } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { Router } from '@angular/router'

import { SidenavService } from 'src/app/classroom/services/sidenav.service'
import { ThemeService } from 'src/app/shared/services/theme.service'

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Aula 13'
  @Input() sidenav: any
  mobileQuery: MediaQueryList
  themeName: any
  sidenavState: boolean

  constructor(
    public media: MediaMatcher,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
  }

  ngOnInit(): void {
    this.themeService.theme.subscribe((result: any) => {
      this.themeName = result.isDark ? '' : 'primary'
    })
    this.sidenavService.sidenavState.subscribe(result => this.sidenavState = result)
  }

  toggleSinenav(): void {
    if (this.mobileQuery.matches) {
      this.sidenav.toggle()
    } else {
      this.sidenavService.sidenavState.next(!this.sidenavService.sidenavState.value)
    }
  }

  signOut(): void {
    this.router.navigate(['login'])
  }
}