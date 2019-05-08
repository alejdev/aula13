import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  title = 'Alumnos'
  studentList: Student[]
  search: string = ''
  orderByProperty: string = 'name'
  columns = [{
    spacer: 'user-avatar-image mrH',
  }, {
    id: 'name',
    name: 'Nombre'
  }, {
    spacer: 'spacer',
  }, {
    id: 'type',
    name: 'Tipo'
  }]

  constructor(private studentService: StudentService) {
    this.studentList = this.studentService.getStudentList()
  }

  ngOnInit() { }

  sort(value: string) {
    this.orderByProperty = value === this.orderByProperty ? `-${value}` : value
  }

  matchOrder(value: string) {
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
