import { Component, OnInit } from '@angular/core'

import { AuthService } from 'src/app/shared/services/auth.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'

import { ClassroomCreationComponent } from '../classroom-creation/classroom-creation.component'
import { SubjectCreationComponent } from '../subject-creation/subject-creation.component'
import { ClassroomDeleteDialogComponent } from '../classroom-delete-dialog/classroom-delete-dialog.component'
import { SubjectDeleteDialogComponent } from '../subject-delete-dialog/subject-delete-dialog.component'
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component'

import { indicatorRotate } from '../../classroom.animation'

import { MatDialog } from '@angular/material'


@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [indicatorRotate]
})
export class SideMenuComponent implements OnInit {

  title = 'Aula 13'
  user: any
  srcImage: any = UtilService.srcImage
  classroomList: any[]
  subjectList: any[]

  menuProfile = [{
    name: 'PROFILE',
    icon: 'user',
    disabled: true,
    action: () => { }
  }, {
    name: 'SIGN.OUT',
    icon: 'sign-out-alt',
    action: () => { this.dialog.open(LogoutDialogComponent) }
  }]

  menuItems = [[{
    name: 'CLASSROOMS',
    icon: 'chalkboard',
    expanded: false,
    create: ClassroomCreationComponent,
    delete: ClassroomDeleteDialogComponent,
    model: ModelService.classroomModel,
    children: null
  }, {
    name: 'SUBJECTS',
    icon: 'book',
    expanded: false,
    create: SubjectCreationComponent,
    delete: SubjectDeleteDialogComponent,
    model: ModelService.subjectModel,
    children: null
  }]]

  menuOptions = [{
    id: 'edit',
    name: 'EDIT_ELEMENT',
    icon: 'pen'
  }, {
    id: 'delete',
    name: 'DELETE_ELEMENT',
    icon: 'trash'
  }]

  constructor(
    private authService: AuthService,
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // Set user
    this.setUserLogged()

    this.classroomService.observeClassroomList()
      .subscribe((result: any) => {
        this.menuItems[0][0].children = UtilService.mapColl(result)
        this.classroomService.cachedClassrooms = this.menuItems[0][0].children
      })

    this.subjectService.observeSubjectList()
      .subscribe((result: any) => {
        this.menuItems[0][1].children = UtilService.mapColl(result)
        this.subjectService.cachedSubjects = this.menuItems[0][1].children
      })
  }

  async setUserLogged(): Promise<any> {
    const auth = await this.authService.readUser(this.authService.userUid)
    this.user = auth.data()
  }

  onItemSelected(item: any): void {
    if (!item.children || !item.children.length) {
      // this.router.navigate([item.route])
    }
    if (item.children && item.children.length) {
      item.expanded = !item.expanded
    }
  }

  createElement(ev: Event, item: any): void {
    ev.stopImmediatePropagation()
    this.dialog.open(item.create, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      data: {
        entity: UtilService.clone(item.model)
      }
    })
  }

  openMenuOption(ev: Event, item: any, child: any, option: any): void {
    ev.stopImmediatePropagation()
    if (option.id === 'edit') {
      this.dialog.open(item.create, {
        width: 'calc(100vw)',
        maxWidth: '800px',
        autoFocus: false,
        data: {
          entity: child
        }
      })
    } else {
      this.dialog.open(item.delete, {
        autoFocus: false,
        data: {
          entity: child
        }
      })
    }
  }
}
