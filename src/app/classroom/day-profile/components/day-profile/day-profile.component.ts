import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { UtilService } from 'src/app/shared/services/util.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { DayService } from 'src/app/classroom/services/day.service'
import { StudentService } from 'src/app/classroom/services/student.service'

import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayDeleteDialogComponent } from 'src/app/classroom/components/day-delete-dialog/day-delete-dialog.component'

@Component({
  selector: 'a13-day-profile',
  templateUrl: './day-profile.component.html',
  styleUrls: ['./day-profile.component.scss']
})
export class DayProfileComponent implements OnInit, OnDestroy {

  dayId: any
  day: any
  dayObservable: any
  srcImage: any = UtilService.srcImage

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dayService: DayService,
    private studentService: StudentService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.dayId = params.id)
    this.getDay()
  }

  async getDay(): Promise<any> {

    // Get day
    this.day = await this.dayService.readDay(this.dayId)

    // Observe day
    this.dayObservable = this.dayService.observeDay(this.dayId)
      .subscribe((result: any) => {
        this.day = UtilService.mapDoc(result)
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
        back: '/aula/diario',
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
          name: 'DAY.DELETE',
          icon: 'trash',
          dialog: {
            component: DayDeleteDialogComponent,
            config: {
              autoFocus: false,
              data: {
                idDay: this.dayId,
                day: { ...this.day }
              }
            }
          }
        }]
      })
    }
  }

  ngOnDestroy(): void {
    this.dayObservable.complete()
  }
}
