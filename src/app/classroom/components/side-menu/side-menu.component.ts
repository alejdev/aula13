import { Component, OnInit } from '@angular/core'

import { animateAvatar, animateText } from '../../classroom.animation'
import { SidenavService } from 'src/app/classroom/services/sidenav.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'

@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [animateText, animateAvatar]
})
export class SideMenuComponent implements OnInit {

  linkText: boolean = true
  getUser: any
  srcImage: any

  menuItems = [[
    { name: 'STUDENTS', url: 'aula/alumnos', icon: 'people' },
    { name: 'SETTINGS', url: 'aula/configuracion', icon: 'settings' }
  ]]

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    // Get sidenav state
    this.sidenavService.sidenavState.subscribe(result => {
      setTimeout(() => {
        this.linkText = result
      }, 200)
    })

    this.getUser = this.authService
    this.srcImage = this.utilService.srcImage
  }
}
