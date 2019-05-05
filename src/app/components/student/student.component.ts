import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'a13-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: Student = null
  @Output() studentChange = new EventEmitter()

  constructor() { }

  ngOnInit() { }

  get studentData() {
    return this.student
  }

  set studentData(val) {
    this.student = val
    this.student.emit(this.student)
  }
}
