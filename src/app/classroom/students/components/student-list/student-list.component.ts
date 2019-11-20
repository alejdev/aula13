import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { Sort, SortDirection } from '@angular/material/sort'

import { StudentCreationComponent } from '../student-creation/student-creation.component'
import { StudentPipe } from 'src/app/classroom/students/pipes/student.pipe'
import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'
import { LoaderService } from 'src/app/shared/services/loader.service'

import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [StudentPipe]
})
export class StudentListComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject()

  title = 'STUDENTS'
  studentList: any[]
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
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.studentList = []
    this.studentListFiltered = []
    this.getStudentsList()
  }

  createStudent(): void {
    this.dialog.open(StudentCreationComponent, {
      width: 'calc(100vw - 2rem)',
      maxWidth: '800px',
      data: {
        student: {
          name: '',
          avatar: 'user-default',
          age: '',
          academicCourse: '',
          parents: {
            fatherName: '',
            fatherPhone: '',
            motherName: '',
            motherPhone: ''
          },
          musical: {
            musicalCourse: '',
            musicalTeacher: '',
            instrument: '',
            subjects: []
          }
        }
      }
    })
  }

  getStudentsList(): void {
    this.studentService.getStudentsList()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        this.studentList = result.map((elem: any) => {
          return {
            id: elem.payload.doc.id,
            ...elem.payload.doc.data()
          }
        })
        this.studentListFiltered = Object.assign(this.studentList)
        this.sortData({ active: this.defaultSort, direction: this.defaultSortDir })
        this.loaderService.stop()
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

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
