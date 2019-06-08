import { Component, OnInit } from '@angular/core'

import { Sort, SortDirection } from '@angular/material/sort'

import { Student } from 'src/app/classroom/models/student'
import { StudentPipe } from 'src/app/classroom/pipes/student.pipe'
import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [StudentPipe]
})
export class StudentListComponent implements OnInit {

  title = 'STUDENTS'
  studentList: Student[]
  studentListFiltered: Student[]
  studentFilter: string = ''
  defaultSort: string = 'fullName'
  defaultSortDir: SortDirection = 'desc'
  sortActive: Sort
  columns = [{
    id: 'fullName',
    name: 'PROP.NAME',
    class: 'ml-4',
  }, {
    id: 'tag',
    name: 'PROP.TAG'
  }]

  constructor(studentService: StudentService, private studentPipe: StudentPipe) {
    this.studentList = studentService.students
    this.studentListFiltered = Object.assign(this.studentList)
    this.sortData({ active: this.defaultSort, direction: this.defaultSortDir })
  }

  ngOnInit(): void { }

  searchStudent(ev: string): void {
    this.studentListFiltered = this.studentPipe.transform(this.studentList, ev)
  }

  sortData(sort: Sort): void {
    this.sortActive = sort
    this.studentListFiltered = UtilService.sortData(this.studentListFiltered, sort)
  }

  isActive(id: string) {
    return this.sortActive.active === id ? 'primary' : ''
  }
}
