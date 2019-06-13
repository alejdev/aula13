import { Component, Input, OnInit } from '@angular/core'

import { Student } from 'src/app/classroom/classroom.model'

@Component({
  selector: 'a13-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: Student = null

  constructor() { }

  ngOnInit(): void { }

  getPuntuation(list: any, index: number): string {
    switch (true) {
      case list.length === index + 1:
        return ``
      case list.length === index + 2:
        return `AND`
      default:
        return `,`
    }
  }
}