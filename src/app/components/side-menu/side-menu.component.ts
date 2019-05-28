import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { SidenavService } from 'src/app/services/sidenav.service';
import { animateAvatar, animateText } from '../../animations/animations';

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
    { name: 'STUDENTS', url: 'aula/alumnos', icon: 'people' },
    { name: 'SUBJECTS', url: 'aula/asignaturas', icon: 'import_contacts' },
    { name: 'SETTINGS', url: 'aula/configuracion', icon: 'settings' }
  ]]

  constructor(sidenavService: SidenavService) {
    sidenavService.sidenavState.subscribe(result => {
      setTimeout(() => {
        this.linkText = result;
      }, 200)
    });
  }

  ngOnInit(): void { }

}