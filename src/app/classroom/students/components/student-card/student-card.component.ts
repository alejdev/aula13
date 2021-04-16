import { StudentArchiveDialogComponent } from 'src/app/classroom/components/student-archive-dialog/student-archive-dialog.component'
import { StudentDeleteDialogComponent } from 'src/app/classroom/components/student-delete-dialog/student-delete-dialog.component'
import { StudentService } from 'src/app/classroom/services/student.service'
import { Student } from 'src/app/core/interfaces'
import { DAY_MODEL } from 'src/app/core/models'
import { DIALOG_CONFIG } from 'src/app/core/settings'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { StudentCreationComponent } from '../student-creation/student-creation.component'

@Component({
  selector: 'a13-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentComponent implements OnInit {

  @Input() student: Student = null
  @Input() fromUrl: string = null
  @Input() grid: boolean
  mark: any = UtilService.mark

  menuOptions: any

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuOptions = [{
      name: 'DAY.ADD',
      icon: 'edit',
      dialog: {
        component: DayCreationComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            day: { ...DAY_MODEL, student: this.student }
          }
        }
      }
    },
    { divider: true },
    {
      name: 'EDIT_STUDENT',
      icon: 'pen',
      dialog: {
        component: StudentCreationComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            idStudent: this.student.id,
            student: { ...this.student }
          }
        }
      }
    }, {
      name: 'CLONE_STUDENT',
      icon: 'copy',
      dialog: {
        component: StudentCreationComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            student: { ...this.student },
            isClone: true
          }
        }
      }
    }, {
      name: `${!this.student.archived ? '' : 'UN'}ARCHIVE_STUDENT`,
      icon: `box${!this.student.archived ? '' : '-open'}`,
      dialog: {
        component: StudentArchiveDialogComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            idStudent: this.student.id,
            student: { ...this.student }
          }
        }
      }
    },
    { divider: true },
    {
      name: 'STUDENT_DELETE',
      icon: 'trash',
      dialog: {
        component: StudentDeleteDialogComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            idStudent: this.student.id,
            student: { ...this.student }
          }
        }
      }
    }]
  }

  goTo() {
    this.router.navigateByUrl(`classroom/student/${this.student.id}`, {
      state: { fromUrl: this.fromUrl }
    })
  }

  fav(ev: Event): void {
    ev.stopImmediatePropagation()
    this.student.favorite = !this.student.favorite
    this.studentService.updateStudent(this.student.id, this.studentService.normalizeStudent(this.student))
  }
}
