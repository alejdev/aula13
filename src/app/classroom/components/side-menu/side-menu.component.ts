import { Component, OnInit } from '@angular/core'

import { User } from 'src/app/classroom/classroom.model'

import { SidenavService } from 'src/app/classroom/services/sidenav.service'
import { animateAvatar, animateText } from '../../classroom.animation'

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
    { name: 'SETTINGS', url: 'aula/configuracion', icon: 'settings' }
  ]]

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
    // Get sidenav state
    this.sidenavService.sidenavState.subscribe(result => {
      setTimeout(() => {
        this.linkText = result
      }, 200)
    })
  }
}
