import { Component, OnInit, Input } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Aula 13'
  @Input() sidenav: any
  mobileQuery: MediaQueryList
  theme: any
  themeName: any
  themeIcon: string

  constructor(private sidenavService: SidenavService, media: MediaMatcher, private themeService: ThemeService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
  }

  ngOnInit(): void {
    this.themeService.theme.subscribe((result: any) => {
      this.theme = result
      this.themeIcon = this.themeService.getNextTheme(this.theme).icon;
      this.themeIsDark()
    });
  }

  toggleSinenav(): void {
    if (this.mobileQuery.matches) {
      this.sidenav.toggle()
    } else {
      this.sidenavService.sidenavState.next(!this.sidenavService.sidenavState.value)
    }
  }

  toggleTheme(): void {
    let currentTheme = this.themeService.getNextTheme(this.theme);
    this.themeService.theme.next(currentTheme)
    this.themeIsDark()
  }

  themeIsDark() {
    this.themeName = this.theme.isDark ? '' : 'primary'
  }
}