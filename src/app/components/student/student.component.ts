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

  ngOnInit(): void { }

  get studentData(): Student {
    return this.student
  }

  set studentData(val) {
    this.student = val
    this.student.emit(this.student)
  }

  getPuntuation(list: any, index: number): string {
    switch (true) {
      case list.length === index+1:
        return ``
      case list.length === index+2:
        return `AND`
      default:
        return `,`
    }
  }
}
