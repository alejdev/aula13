import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'

import { StudentCreationComponent } from '../student-creation/student-creation.component'

@Component({
  selector: 'a13-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: any = null
  mark: any = UtilService.mark

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  editStudent(ev: Event) {
    ev.stopImmediatePropagation()
    this.dialog.open(StudentCreationComponent, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      disableClose: true,
      data: {
        idStudent: this.student.id,
        student: { ...this.student }
      }
    })
  }


  fav(ev: Event): void {
    ev.stopImmediatePropagation()
    this.student.favorite = !this.student.favorite
    this.studentService.updateStudent(this.student.id, this.student)
  }
}
