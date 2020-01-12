import { Component, OnInit } from '@angular/core'

import { indicatorRotate } from '../../classroom.animation'
import { SidenavService } from 'src/app/classroom/services/sidenav.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { Router } from '@angular/router'

@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [indicatorRotate]
})
export class SideMenuComponent implements OnInit {

  title = 'Aula 13'
  getUser: any
  srcImage: any = UtilService.srcImage
  classroomList: any[]
  subjectList: any[]

  menuItems = [[
    {
      name: 'CLASSROOMS',
      icon: 'university',
      children: null
    }, {
      name: 'SUBJECTS',
      icon: 'book',
      children: null
    }
  ]]

  constructor(
    private authService: AuthService,
    private router: Router,
    private classroomService: ClassroomService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getUser = this.authService

    this.classroomService.observeClassroomList()
      .subscribe((result: any) => {
        this.menuItems[0][0].children = this.classroomService.mapClassroomList(result)
      })

    this.subjectService.observeSubjectList()
      .subscribe((result: any) => {
        this.menuItems[0][1].children = this.subjectService.mapSubjectList(result)
      })
  }

  onItemSelected(item: any) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route])
    }
    if (item.children && item.children.length) {
      item.expanded = !item.expanded
    }
  }

  openMenu(ev: Event) {
    ev.stopImmediatePropagation()
    console.log(ev)
  }
}
