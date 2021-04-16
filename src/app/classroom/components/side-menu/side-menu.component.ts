import { combineLatest, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { INDICATOR_ROTATE } from 'src/app/core/animations'
import { DIALOG_CONFIG, SKELETON_CONFIG } from 'src/app/core/settings'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

import { StudentService } from '../../services/student.service'
import { ClassroomCreationComponent } from '../classroom-creation/classroom-creation.component'
import { ClassroomDeleteDialogComponent } from '../classroom-delete-dialog/classroom-delete-dialog.component'
import { SubjectCreationComponent } from '../subject-creation/subject-creation.component'
import { SubjectDeleteDialogComponent } from '../subject-delete-dialog/subject-delete-dialog.component'
import { LogoConfig } from '../title-logo/title-logo.component'

@Component({
  selector: 'a13-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [INDICATOR_ROTATE]
})
export class SideMenuComponent implements OnInit {

  title = 'Aula 13'
  user: any

  data$: Observable<any>
  skeleton: any = SKELETON_CONFIG

  logoConfig: LogoConfig = {
    showLogo: true,
    showTagline: true,
    imageInvertedIfDarkTheme: true,
    shake: true,
    color: 'black',
    size: '80px',
  }

  menuItems = [[{
    id: 'classroomList',
    name: 'CLASSROOMS',
    tooltip: 'CREATE_CLASSROOM',
    icon: 'chalkboard',
    color: 'primary',
    expanded: true,
    create: ClassroomCreationComponent,
    delete: ClassroomDeleteDialogComponent,
    model: ModelService.classroomModel,
    children: null
  }, {
    id: 'subjectList',
    name: 'SUBJECTS',
    tooltip: 'CREATE_SUBJECT',
    icon: 'book',
    color: 'accent',
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
    id: 'clone',
    name: 'CLONE_ELEMENT',
    icon: 'copy'
  },
  { divider: true },
  {
    id: 'delete',
    name: 'DELETE_ELEMENT',
    icon: 'trash'
  }]

  constructor(
    private authService: AuthService,
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // Set user
    this.setUserLogged()

    const classroomList$ = this.classroomService.observeClassroomList()
    const subjectList$ = this.subjectService.observeSubjectList()
    const studentList$ = this.studentService.observeStudentList()

    this.data$ = combineLatest([studentList$, classroomList$, subjectList$]).pipe(
      tap((result) => {
        const studentList = UtilService.mapCollection(result[0])
        const classroomList = UtilService.mapCollection(result[1]).map((classroom) => ({
          ...classroom,
          filter: 'classroomsFilter',
          studentList: studentList.filter((elem: any) => elem.classroom.classrooms.some((classroomId) => classroomId === classroom.id))
        }))
        const subjectList = UtilService.mapCollection(result[2]).map((subject) => ({
          ...subject,
          filter: 'subjectsFilter',
          studentList: studentList.filter((elem: any) => elem.classroom.subjects.some((subjectId) => subjectId === subject.id))
        }))
        this.menuItems[0][0].children = classroomList
        this.menuItems[0][1].children = subjectList
        this.classroomService.cachedClassrooms = classroomList
        this.subjectService.cachedSubjects = subjectList
        return { classroomList, subjectList }
      })
    )
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

    switch (option.id) {
      case 'edit':
        this.dialog.open(item.create, {
          ...DIALOG_CONFIG,
          data: {
            entity: UtilService.clone(child)
          }
        })
        break
      case 'clone':
        this.dialog.open(item.create, {
          ...DIALOG_CONFIG,
          data: {
            entity: UtilService.clone(child),
            isClone: true
          }
        })
        break
      default:
        this.dialog.open(item.delete, {
          ...DIALOG_CONFIG,
          data: {
            entity: UtilService.clone(child)
          }
        })
        break
    }
  }
}
