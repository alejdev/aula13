import { Component, OnInit, OnDestroy } from '@angular/core'

import { StudentCreationComponent } from '../student-creation/student-creation.component'
import { StudentPipe } from 'src/app/classroom/students/pipes/student.pipe'
import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { ModelService } from 'src/app/shared/services/model.service'

import { MatDialog } from '@angular/material'
import { HeaderService } from 'src/app/classroom/services/header.service'

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [StudentPipe]
})
export class StudentListComponent implements OnInit, OnDestroy {

  studentList: any[]
  studentListObservable: any
  studentListFiltered: any[]
  studentFilter: string = ''
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
      text: 'REST_STUDENTS',
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
    private studentPipe: StudentPipe,
    private dialog: MatDialog,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    // Config header
    this.headerService.configHeader({
      title: 'STUDENTS'
    })

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
      data: {
        student: UtilService.clone(ModelService.studenModel)
      }
    })
  }

  getStudentList(): void {
    this.studentService.getStudentList()
      .then((result: any) => {
        this.studentList = this.studentService.mapStudentList(result)
      })
  }

  observeStudentList(): void {
    this.studentListObservable = this.studentService.observeStudentList()
      .subscribe((result: any) => {
        this.studentList = this.studentService.mapStudentList(result)
        this.studentService.setCachedStudentList(this.studentList)
        this.studentListFiltered = Object.assign(this.studentList)
        this.filterStudents()
      })
  }

  searchStudent(ev: string): void {
    this.studentListFiltered = this.studentPipe.transform(this.studentList, ev)
    this.filterStudents()
  }

  resetFilter(): void {
    this.studentFilter = ''
    this.studentListFiltered = Object.assign(this.studentList)
  }

  filterStudents(): void {
    this.favoriteListFiltered = this.studentListFiltered.filter(student => student.favorite && !student.archived)
    this.restListFiltered = this.studentListFiltered.filter(student => !student.favorite && !student.archived)
    this.archivedListFiltered = this.studentListFiltered.filter(student => student.archived)
  }

  showMore(list: string): void {
    const state = this.toggleConfig[list].show
    this.toggleConfig[list].show = state ? false : true
    this.toggleConfig[list].icon = `caret-${state ? 'down' : 'up'}`
  }

  ngOnDestroy(): void {
    this.studentListObservable.complete()
  }
}
