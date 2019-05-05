import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { onSideNavChange, animateText, animateAvatar } from '../../animations/animations'
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [onSideNavChange, animateText, animateAvatar]
})
export class SideMenuComponent implements OnInit {

  public sideNavState: boolean = true
  public linkText: boolean = true

  public user: User = { name: 'Alejandro', avatar: '' }

  public menuItems = [
    [
      { name: 'Alumnos', url: 'aula/alumnos', icon: 'people', theme: 'blue' },
      { name: 'Asignaturas', url: 'aula/asignaturas', icon: 'import_contacts', theme: 'red' },
      { name: 'Configuración', url: 'aula/configuracion', icon: 'settings', theme: 'green' }
    ], [
    ]
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

