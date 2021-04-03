import { Subscription } from 'rxjs'
import { DayArchiveDialogComponent } from 'src/app/classroom/components/day-archive-dialog/day-archive-dialog.component'
import { DayDeleteDialogComponent } from 'src/app/classroom/components/day-delete-dialog/day-delete-dialog.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'a13-day-profile',
  templateUrl: './day-profile.component.html',
  styleUrls: ['./day-profile.component.scss']
})
export class DayProfileComponent implements OnInit, OnDestroy {

  dayId: any
  day: any

  routerSubscription: Subscription
  daySubscription: Subscription

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dayService: DayService,
    private studentService: StudentService,
    private headerService: HeaderService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.routerSubscription = this.activatedRoute.params.subscribe(params => this.dayId = params.id)

    this.daySubscription = this.dayService.observeDay(this.dayId)
      .subscribe((result: any) => {
        this.day = UtilService.mapDocument(result)
        if (this.day.studentId) {
          this.getStudent(this.day.studentId)
        } else {
          this.router.navigate(['aula/diario'])
        }
      })
  }

  async getStudent(id: string): Promise<any> {
    this.day.student = await this.studentService.readStudent(id)
    this.configHeader()
  }

  configHeader() {
    if (this.day && this.day.title) {
      // Config header
      this.headerService.configHeader({
        title: this.day.title,
        back: true,
        day: this.day,
        truncable: true,
        menuOptions: [{
          name: 'DAY.EDIT',
          icon: 'pen',
          dialog: {
            component: DayCreationComponent,
            config: {
              width: 'calc(100vw)',
              maxWidth: '800px',
              autoFocus: false,
              data: {
                idDay: this.dayId,
                day: { ...this.day }
              }
            }
          }
        }, {
          name: 'DAY.DUPLICATE',
          icon: 'copy',
          dialog: {
            component: DayCreationComponent,
            config: {
              width: 'calc(100vw)',
              maxWidth: '800px',
              autoFocus: false,
              data: {
                day: { ...this.day }
              }
            }
          }
        }, {
          name: `${!this.day.archived ? '' : 'UN'}ARCHIVE_DAY`,
          icon: `box${!this.day.archived ? '' : '-open'}`,
          dialog: {
            component: DayArchiveDialogComponent,
            config: {
              autoFocus: false,
              data: {
                idDay: this.dayId,
                day: { ...this.day }
              }
            }
          }
        }, {
          name: 'DAY.DELETE',
          icon: 'trash',
          dialog: {
            component: DayDeleteDialogComponent,
            config: {
              width: 'calc(100vw)',
              maxWidth: '800px',
              autoFocus: false,
              data: {
                day: { ...this.day }
              }
            }
          }
        }]
      })
    }
  }

  editDay() {
    this.dialog.open(DayCreationComponent, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      disableClose: true,
      data: {
        idDay: this.dayId,
        day: { ...this.day }
      }
    })
  }

  quickAction(key: string): void {
    this.day[key] = !this.day[key]
    this.dayService.updateDay(this.dayId, this.dayService.normalizeDay(this.day))
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe()
    this.daySubscription.unsubscribe()
  }
}
