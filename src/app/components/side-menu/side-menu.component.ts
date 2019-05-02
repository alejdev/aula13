import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { onSideNavChange, animateText, animateAvatar } from '../../animations/animations'

interface User {
  name: string
}

interface MenuItem {
  name: string
  url: string
  icon: string
}

@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [onSideNavChange, animateText, animateAvatar]
})
export class SideMenuComponent implements OnInit {

  public sideNavState: boolean = true
  public linkText: boolean = true

  public user: User = { name: 'Alejandro' }

  public menuItems: MenuItem[] = [
    { name: 'Alumnos', url: 'some-link', icon: 'people' },
    { name: 'Asignaturas', url: 'some-link', icon: 'import_contacts' },
    { name: 'Configuración', url: 'some-link', icon: 'settings' },
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

