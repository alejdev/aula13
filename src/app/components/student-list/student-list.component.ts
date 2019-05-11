import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/interfaces/student';
import { StudentPipe } from 'src/app/pipes/student.pipe';

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [StudentPipe]
})
export class StudentListComponent implements OnInit {

  title = 'Alumnos'
  studentList: Student[]
  studentListFiltered: Student[]
  studentFilter: string = ''
  orderByProperty: string = 'fullName'
  columns = [{
    id: 'fullName',
    name: 'Nombre',
    class: 'ml4',
  }, {
    id: 'type',
    name: 'Tipo'
  }]

  constructor(private studentService: StudentService, private studentPipe: StudentPipe) {
    this.studentList = this.studentService.studentList
    this.studentListFiltered = Object.assign(this.studentList)
  }

  ngOnInit() { }

  searchStudent(ev: string): void {
    this.studentListFiltered = this.studentPipe.transform(this.studentList, ev)
  }

  sort(value: string): void {
    this.orderByProperty = value === this.orderByProperty ? `-${value}` : value
  }

  matchOrder(value: string): RegExpMatchArray {
    let regex = `-?${value}`
    return this.orderByProperty.match(new RegExp(regex, 'g'))
  }

  getArrow(value: string): string {
    if (`-${value}` === this.orderByProperty) {
      return 'arrow_upward'
    }
    return 'arrow_downward'
  }
}
