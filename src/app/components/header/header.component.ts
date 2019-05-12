import { Component, OnInit, Input } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Aula 13'
  @Input() sidenav: any;
  mobileQuery: MediaQueryList

  constructor(private sidenavService: SidenavService, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
  }

  ngOnInit(): void { }

  toggleSinenav(): void {
    if (this.mobileQuery.matches) {
      this.sidenav.toggle()
    } else {
      this.sidenavService.sidenavState.next(!this.sidenavService.sidenavState.value)
    }
  }
}