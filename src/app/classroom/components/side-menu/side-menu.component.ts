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
  getUser: any
  srcImage: any = UtilService.srcImage
  classroomList: any[]
  subjectList: any[]

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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser = this.authService

    this.classroomService.observeClassroomList()
      .subscribe((result: any) => {
        this.menuItems[0][0].children = this.classroomService.mapClassroomList(result)
        this.classroomService.setCachedClassroomList(this.menuItems[0][0].children)
      })

    this.subjectService.observeSubjectList()
      .subscribe((result: any) => {
        this.menuItems[0][1].children = this.subjectService.mapSubjectList(result)
        this.subjectService.setCachedSubjectList(this.menuItems[0][1].children)
      })
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
          idEntity: child.id,
          entity: child
        }
      })
    } else {
      this.dialog.open(item.delete, {
        autoFocus: false,
        data: {
          idEntity: child.id
        }
      })
    }
  }
}
