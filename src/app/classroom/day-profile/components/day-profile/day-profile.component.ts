import { Observable, of, Subscription } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { DayArchiveDialogComponent } from 'src/app/classroom/components/day-archive-dialog/day-archive-dialog.component'
import { DayDeleteDialogComponent } from 'src/app/classroom/components/day-delete-dialog/day-delete-dialog.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { Day, Student } from 'src/app/core/interfaces'
import { DIALOG_CONFIG, SKELETON_CONFIG } from 'src/app/core/settings'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { LoaderService } from 'src/app/shared/services/loader.service'
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

  data$: Observable<any>
  router$: Subscription

  skeleton: any = SKELETON_CONFIG

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dayService: DayService,
    private studentService: StudentService,
    private headerService: HeaderService,
    private loaderService: LoaderService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Observe new params
    this.router$ = this.activatedRoute.params.subscribe(params => this.loadData(params.id))
  }

  loadData(dayId: string): void {
    this.data$ = this.dayService.observeDay(dayId).pipe(
      tap(() => this.loaderService.load()),
      map((day) => UtilService.mapDocument(day)),
      switchMap((day: Day) => {
        if (!day) { return of(day) }
        return this.studentService.observeStudent(day.studentId)
          .pipe(map((student: Student) => ({ ...day, student: UtilService.mapDocument(student) })))
      }),
      tap((day: Day) => {
        this.loaderService.down()
        if (!day) {
          this.router.navigateByUrl(history.state.fromUrl ? history.state.fromUrl : 'classroom/daily')
          return
        }
        this.configHeader(day)
      })
    )
  }

  configHeader(day: Day): void {
    this.headerService.configHeader({
      title: day.title,
      back: true,
      day,
      truncable: true,
      menuOptions: [{
        name: 'DAY.EDIT',
        icon: 'pen',
        dialog: {
          component: DayCreationComponent,
          config: {
            ...DIALOG_CONFIG,
            data: {
              idDay: day.id,
              day: { ...day }
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
              day: { ...day },
              isClone: true
            }
          }
        }
      }, {
        name: `${!day.archived ? '' : 'UN'}ARCHIVE_DAY`,
        icon: `box${!day.archived ? '' : '-open'}`,
        dialog: {
          component: DayArchiveDialogComponent,
          config: {
            ...DIALOG_CONFIG,
            data: {
              idDay: day.id,
              day: { ...day }
            }
          }
        }
      },
      { divider: true },
      {
        name: 'DAY.DELETE',
        icon: 'trash',
        dialog: {
          component: DayDeleteDialogComponent,
          config: {
            ...DIALOG_CONFIG,
            data: {
              day: { ...day }
            }
          }
        }
      }]
    })
  }

  tapToEdit(day: any): void {
    this.dialog.open(DayCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        idDay: day.id,
        day: { ...day }
      }
    })
  }

  quickAction(day: Day, key: string): void {
    day[key] = !day[key]
    this.dayService.updateDay(day.id, this.dayService.normalizeDay(day))
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe()
  }
}
