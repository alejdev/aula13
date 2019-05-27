import { Component, OnInit, } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/interfaces/student';
import { StudentPipe } from 'src/app/pipes/student.pipe';
import { Sort, SortDirection } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';

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
    class: 'ml4',
  }, {
    id: 'tag',
    name: 'PROP.TAG'
  }]

  constructor(private studentService: StudentService, private studentPipe: StudentPipe, private utilService: UtilService) {
    this.studentList = this.studentService.studentList
    this.studentListFiltered = Object.assign(this.studentList)
    this.sortData({ active: this.defaultSort, direction: this.defaultSortDir })
  }

  ngOnInit(): void { }

  searchStudent(ev: string): void {
    this.studentListFiltered = this.studentPipe.transform(this.studentList, ev)
  }

  sortData(sort: Sort): void {
    this.sortActive = sort
    this.studentListFiltered = this.utilService.sortData(this.studentListFiltered, sort)
  }

  isActive(id: string) {
    return this.sortActive.active === id ? 'primary' : ''
  }
}
