import { Subscription } from 'rxjs'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { FilterPipe } from 'src/app/shared/pipes/student.pipe'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'

import { StudentCreationComponent } from '../student-creation/student-creation.component'

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [FilterPipe]
})
export class StudentListComponent implements OnInit, OnDestroy {

  studentList: any[]
  studentListSubscription: Subscription

  studentFilter: string = ''
  studentListFiltered: any[]

  favoriteListFiltered: any[]
  restListFiltered: any[]
  archivedListFiltered: any[]

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
    // Config header
    this.headerService.configHeader({ title: 'STUDENTS' })

    this.studentList = []
    this.studentListFiltered = []

    this.getStudentList()
    this.observeStudentList()
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

  async getStudentList(): Promise<any> {
    await this.studentService.getStudentList()
  }

  observeStudentList(): void {
    this.studentListSubscription = this.studentService.observeStudentList()
      .subscribe((result: any) => {
        this.studentList = UtilService.mapCollection(result)
        this.studentListFiltered = Object.assign(this.studentList)
        this.filterStudents()
      })
  }

  searchStudent(ev: string): void {
    this.studentListFiltered = this.filterPipe.transform(this.studentList, ev)
    this.filterStudents()
  }

  resetFilter(): void {
    this.studentFilter = ''
    this.studentListFiltered = Object.assign(this.studentList)
    this.filterStudents()
  }

  filterStudents(): void {
    this.favoriteListFiltered = this.studentListFiltered.filter(student => student.favorite && !student.archived)
    this.restListFiltered = this.studentListFiltered.filter(student => !student.favorite && !student.archived)
    this.archivedListFiltered = this.studentListFiltered.filter(student => student.archived)

    // Show group list if search inside
    if (this.studentFilter.length > 1) {
      switch (true) {
        case this.favoriteListFiltered.length > 0:
          this.showMore('favorite', true)
        case this.restListFiltered.length > 0:
          this.showMore('rest', true)
        case this.archivedListFiltered.length > 0:
          this.showMore('archived', true)
      }
    } else if (this.studentFilter.length === 0) {
      this.showMore('archived', false)
    }

    // Total listFiltered length
    this.headerService.mergeHeader({
      length:
        this.favoriteListFiltered.length +
        this.restListFiltered.length +
        this.archivedListFiltered.length
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
