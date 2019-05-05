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
  columns = ['nombre', 'telefono', 'spacer', 'tipo']
  studentList: Student[]
  search: string = ''

  constructor(private studentService: StudentService) {
    this.studentList = this.studentService.getStudentList()
  }

  ngOnInit() { }

  sort(value) {
    console.log(value);
  }
}
