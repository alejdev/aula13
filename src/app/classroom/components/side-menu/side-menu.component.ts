import { Component, OnInit } from '@angular/core'

import { animateAvatar, animateText, indicatorRotate } from '../../classroom.animation'
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
  animations: [animateText, animateAvatar, indicatorRotate]
})
export class SideMenuComponent implements OnInit {

  linkText: boolean = true
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
    private sidenavService: SidenavService,
    private authService: AuthService,
    public router: Router,
    public classroomService: ClassroomService,
    public subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    // Get sidenav state
    this.sidenavService.sidenavState.subscribe(result => {
      setTimeout(() => {
        this.linkText = result
      }, 200)
    })
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
