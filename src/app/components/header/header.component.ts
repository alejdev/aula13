import { Component, OnInit, Input } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';

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

  constructor(private sidenavService: SidenavService, media: MediaMatcher, private themeService: ThemeService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
  }

  ngOnInit(): void {
    this.themeService.theme.subscribe((result: any) => {
      this.themeName = result.isDark ? '' : 'primary'
    });
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
    this.router.navigateByUrl('/login')
  }
}