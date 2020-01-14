import { Component, OnInit, OnDestroy } from '@angular/core'

import { Sort, SortDirection } from '@angular/material/sort'

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
  defaultSort: string = 'name'
  defaultSortDir: SortDirection = 'desc'
  sortActive: Sort
  columns = [{
    id: 'name',
    name: 'PROP.NAME',
    class: 'ml-4',
  }, {
    id: 'label',
    name: 'PROP.LABEL'
  }]

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
      width: 'calc(100vw - 2rem)',
      maxWidth: '800px',
      data: {
        student: ModelService.studenModel
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
        this.sortData({ active: this.defaultSort, direction: this.defaultSortDir })
      })
  }

  searchStudent(ev: string): void {
    this.studentListFiltered = this.studentPipe.transform(this.studentList, ev)
  }

  sortData(sort: Sort): void {
    this.sortActive = sort
    this.studentListFiltered = UtilService.sortData(this.studentListFiltered, sort)
  }

  isActive(id: string): string {
    return this.sortActive.active === id ? 'primary' : ''
  }

  resetFilter(): void {
    this.studentFilter = ''
    this.studentListFiltered = Object.assign(this.studentList)
  }

  ngOnDestroy(): void {
    this.studentListObservable.complete()
  }
}
