import { StudentService } from 'src/app/classroom/services/student.service'
import { DIALOG_CONFIG } from 'src/app/core/core.module'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

import { StudentCreationComponent } from '../student-creation/student-creation.component'

@Component({
  selector: 'a13-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: any = null
  @Input() fromUrl: string = null
  mark: any = UtilService.mark

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void { }

  goTo() {
    this.router.navigateByUrl(`aula/alumno/${this.student.id}`, {
      state: { fromUrl: this.fromUrl }
    })
  }

  editStudent(ev: Event) {
    ev.stopImmediatePropagation()
    this.dialog.open(StudentCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        idStudent: this.student.id,
        student: { ...this.student }
      }
    })
  }

  fav(ev: Event): void {
    ev.stopImmediatePropagation()
    this.student.favorite = !this.student.favorite
    this.studentService.updateStudent(this.student.id, this.studentService.normalizeStudent(this.student))
  }
}
