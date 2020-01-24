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
      })
  }

  searchStudent(ev: string): void {
    this.studentListFiltered = this.studentPipe.transform(this.studentList, ev)
  }

  resetFilter(): void {
    this.studentFilter = ''
    this.studentListFiltered = Object.assign(this.studentList)
  }

  ngOnDestroy(): void {
    this.studentListObservable.complete()
  }
}
