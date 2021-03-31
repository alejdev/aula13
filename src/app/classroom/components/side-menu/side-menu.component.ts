import { Subscription } from 'rxjs'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

import { indicatorRotate } from '../../classroom.animation'
import { ClassroomCreationComponent } from '../classroom-creation/classroom-creation.component'
import { ClassroomDeleteDialogComponent } from '../classroom-delete-dialog/classroom-delete-dialog.component'
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component'
import { SubjectCreationComponent } from '../subject-creation/subject-creation.component'
import { SubjectDeleteDialogComponent } from '../subject-delete-dialog/subject-delete-dialog.component'

@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [indicatorRotate]
})
export class SideMenuComponent implements OnInit, OnDestroy {

  title = 'Aula 13'
  user: any

  classroomList: any[]
  subjectList: any[]
  classroomSubscription: Subscription
  subjectSubscription: Subscription

  menuProfile = [{
    name: 'PROFILE',
    icon: 'user',
    action: () => { this.toastService.info({ text: 'MSG.SERVICE_NOT_AVAILABLE' }) }
  }, {
    name: 'SIGN.OUT',
    icon: 'sign-out-alt',
    action: () => { this.dialog.open(LogoutDialogComponent) }
  }]

  menuItems = [[{
    name: 'CLASSROOMS',
    icon: 'chalkboard',
    expanded: true,
    create: ClassroomCreationComponent,
    delete: ClassroomDeleteDialogComponent,
    model: ModelService.classroomModel,
    children: null
  }, {
    name: 'SUBJECTS',
    icon: 'book',
    expanded: true,
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
    private dialog: MatDialog,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // Set user
    this.setUserLogged()

    this.classroomSubscription = this.classroomService.observeClassroomList()
      .subscribe((result: any) => {
        this.menuItems[0][0].children = UtilService.mapCollection(result).map((elem) => {
          return { filter: 'classroomsFilter', ...elem }
        })
        this.classroomService.cachedClassrooms = this.menuItems[0][0].children
      })

    this.subjectSubscription = this.subjectService.observeSubjectList()
      .subscribe((result: any) => {
        this.menuItems[0][1].children = UtilService.mapCollection(result).map((elem) => {
          return { filter: 'subjectsFilter', ...elem }
        })
        this.subjectService.cachedSubjects = this.menuItems[0][1].children
      })
  }

  async setUserLogged(): Promise<any> {
    const auth = await this.authService.readUser(this.authService.userUid)
    this.user = auth.data()
  }

  onItemSelected(ev: Event, item: any): void {
    if (!item.children || !item.children.length) {
      this.router.navigate(['aula/alumnos'], {
        queryParams: { [item.filter]: [item.id] }
      })
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
      disableClose: true,
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
        disableClose: true,
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

  ngOnDestroy(): void {
    this.classroomSubscription.unsubscribe()
    this.subjectSubscription.unsubscribe()
  }
}
