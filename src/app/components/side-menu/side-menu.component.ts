import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { onSideNavChange, animateText } from '../../animations/animations'

interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class SideMenuComponent implements OnInit {

  public sideNavState: boolean = true;
  public linkText: boolean = true;

  public pages: Page[] = [
    { name: 'Inbox', link: 'some-link', icon: 'inbox' },
    { name: 'Starred', link: 'some-link', icon: 'star' },
    { name: 'Send email', link: 'some-link', icon: 'send' },
  ]

  constructor(private _sidenavService: SidenavService) { }

  ngOnInit() {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}

