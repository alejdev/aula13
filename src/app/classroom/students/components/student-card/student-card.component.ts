import { Component, Input, OnInit } from '@angular/core'

import { UtilService } from 'src/app/shared/services/util.service'
import { StudentService } from 'src/app/classroom/services/student.service'

@Component({
  selector: 'a13-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: any = null
  mark: any = UtilService.mark
  srcImage: any = UtilService.srcImage

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void { }

  fav(ev: Event): void {
    ev.stopImmediatePropagation()
    this.student.favorite = !this.student.favorite
    this.studentService.updateStudent(this.student.id, this.student)
  }
}
