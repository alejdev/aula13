import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { DIALOG_CONFIG } from 'src/app/core/core.module'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

import { indicatorRotate } from '../../classroom.animation'
import { ClassroomCreationComponent } from '../classroom-creation/classroom-creation.component'
import { ClassroomDeleteDialogComponent } from '../classroom-delete-dialog/classroom-delete-dialog.component'
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

  classroomList$: Subscription
  subjectList$: Subscription

  menuItems = [[{
    name: 'CLASSROOMS',
    tooltip: 'CREATE_CLASSROOM',
    icon: 'chalkboard',
    expanded: true,
    create: ClassroomCreationComponent,
    delete: ClassroomDeleteDialogComponent,
    model: ModelService.classroomModel,
    children: null
  }, {
    name: 'SUBJECTS',
    tooltip: 'CREATE_SUBJECT',
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
    private router: Router,
  ) { }

  ngOnInit(): void {

    // Set user
    this.setUserLogged()

    this.classroomList$ = this.classroomService.observeClassroomList().pipe(
      map((result) => UtilService.mapCollection(result)
        .map((elem) => ({ filter: 'classroomsFilter', ...elem })))
    ).subscribe((classroomList) => {
      this.menuItems[0][0].children = classroomList
      this.classroomService.cachedClassrooms = classroomList
    })

    this.subjectList$ = this.subjectService.observeSubjectList().pipe(
      map((result) => UtilService.mapCollection(result)
        .map((elem) => ({ filter: 'subjectsFilter', ...elem })))
    ).subscribe((subjectList) => {
      this.menuItems[0][1].children = subjectList
      this.subjectService.cachedSubjects = subjectList
    })
  }

  async setUserLogged(): Promise<any> {
    const auth = await this.authService.readUser(this.authService.userUid)
    this.user = auth.data()
  }

  onItemSelected(ev: Event, item: any): void {
    if (!item.children || !item.children.length) {
      this.router.navigate(['classroom/students'], {
        queryParams: { [item.filter]: [item.id], openFilters: true }
      })
    }
    if (item.children && item.children.length) {
      item.expanded = !item.expanded
    }
  }

  createElement(ev: Event, item: any): void {
    ev.stopImmediatePropagation()
    this.dialog.open(item.create, {
      ...DIALOG_CONFIG,
      data: {
        entity: UtilService.clone(item.model)
      }
    })
  }

  openMenuOption(ev: Event, item: any, child: any, option: any): void {
    ev.stopImmediatePropagation()
    if (option.id === 'edit') {
      this.dialog.open(item.create, {
        ...DIALOG_CONFIG,
        data: {
          entity: child
        }
      })
    } else {
      this.dialog.open(item.delete, {
        ...DIALOG_CONFIG,
        data: {
          entity: child
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.classroomList$.unsubscribe()
    this.subjectList$.unsubscribe()
  }
}
