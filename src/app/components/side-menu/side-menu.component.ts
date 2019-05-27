import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { animateText, animateAvatar } from '../../animations/animations'
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [animateText, animateAvatar]
})
export class SideMenuComponent implements OnInit {

  linkText: boolean = true
  user: User = { name: 'Alejandro', avatar: '' }

  menuItems = [[
    { name: 'Alumnos', url: 'aula/alumnos', icon: 'people' },
    { name: 'Asignaturas', url: 'aula/asignaturas', icon: 'import_contacts' },
    { name: 'Configuración', url: 'aula/configuracion', icon: 'settings' }
  ]]

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sidenavState.subscribe(result => {
      setTimeout(() => {
        this.linkText = result;
      }, 200)
    });
  }

  ngOnInit(): void { }

}