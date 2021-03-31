import { Subscription } from 'rxjs'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'

import { AgroupByPipe } from '../../pipes/agroup-by.pipe'
import { ClassroomPipe } from '../../pipes/classroom.pipe'
import { SubjectPipe } from '../../pipes/subject.pipe'
import { StudentCreationComponent } from '../student-creation/student-creation.component'

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [FilterPipe, ClassroomPipe, SubjectPipe, AgroupByPipe]
})
export class StudentListComponent implements OnInit, OnDestroy {

  studentList: any[]
  studentListFiltered: any[]

  favoriteListFiltered: any[]
  restListFiltered: any[]
  archivedListFiltered: any[]

  studentListSubscription: Subscription

  toggleConfig: any = {
    favorite: {
      show: true,
      text: 'FAVORITES',
      icon: 'caret-up'
    },
    rest: {
      show: true,
      text: 'STUDENTS',
      icon: 'caret-up'
    },
    archived: {
      show: false,
      text: 'ARCHIVED_STUDENTS',
      icon: 'caret-down'
    }
  }

  constructor(
    private studentService: StudentService,
    private filterPipe: FilterPipe,
    private dialog: MatDialog,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.configHeader({ title: 'STUDENTS' })
    this.loadData()
  }

  loadData(): void {
    this.studentList = []
    this.studentListSubscription = this.studentService.observeStudentList().subscribe((result: any) => {
      this.studentList = UtilService.mapCollection(result)
      this.studentListFiltered = Object.assign(this.studentList)
    })
  }

  createStudent(): void {
    this.dialog.open(StudentCreationComponent, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      disableClose: true,
      data: {
        student: UtilService.clone(ModelService.studenModel)
      }
    })
  }

  showMore(list: string, show?: boolean): void {
    const state = typeof show === 'undefined' ? !this.toggleConfig[list].show : show
    this.toggleConfig[list].show = state
    this.toggleConfig[list].icon = `caret-${!state ? 'down' : 'up'}`
  }

  ngOnDestroy(): void {
    this.studentListSubscription.unsubscribe()
  }
}
