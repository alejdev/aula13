import { of, Subscription } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { DayArchiveDialogComponent } from 'src/app/classroom/components/day-archive-dialog/day-archive-dialog.component'
import { DayDeleteDialogComponent } from 'src/app/classroom/components/day-delete-dialog/day-delete-dialog.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { DIALOG_CONFIG } from 'src/app/core/core.module'
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

  daySubscription$: Subscription
  routerSubscription$: Subscription

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dayService: DayService,
    private studentService: StudentService,
    private headerService: HeaderService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // Observe new params
    this.routerSubscription$ = this.activatedRoute.params.subscribe(params => {
      this.dayId = params.id
      if (this.daySubscription$) { this.daySubscription$.unsubscribe() }
      this.loadData()
    })
  }

  loadData() {
    const day$ = this.dayService.observeDay(this.dayId)

    this.daySubscription$ = day$.pipe(
      map((day) => UtilService.mapDocument(day)),
      switchMap((day) => {
        if (!day) { return of(day) }
        return this.studentService.observeStudent(day.studentId ? day.studentId : 'asd')
          .pipe(map((student) => ({
            ...day,
            student: UtilService.mapDocument(student)
          })))
      })
    ).subscribe((result: any) => {
      // If not exists, go back to the route where came from
      if (!result) {
        this.router.navigateByUrl(history.state.fromUrl)
        return
      }
      this.day = result
      this.configHeader()
    })
  }

  configHeader() {
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
            ...DIALOG_CONFIG,
            data: {
              idDay: this.dayId,
              day: { ...this.day }
            }
          }
        }
      }, {
        name: 'DAY.CLONE',
        icon: 'copy',
        dialog: {
          component: DayCreationComponent,
          config: {
            ...DIALOG_CONFIG,
            data: {
              day: { ...this.day },
              isClone: true
            }
          }
        }
      }, {
        name: `${!this.day.archived ? '' : 'UN'}ARCHIVE_DAY`,
        icon: `box${!this.day.archived ? '' : '-open'}`,
        dialog: {
          component: DayArchiveDialogComponent,
          config: {
            ...DIALOG_CONFIG,
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
            ...DIALOG_CONFIG,
            data: {
              day: { ...this.day }
            }
          }
        }
      }]
    })
  }

  editDay() {
    this.dialog.open(DayCreationComponent, {
      ...DIALOG_CONFIG,
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
    this.routerSubscription$.unsubscribe()
    this.daySubscription$.unsubscribe()
  }
}
