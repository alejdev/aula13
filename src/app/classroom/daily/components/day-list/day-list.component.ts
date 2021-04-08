import { Subscription } from 'rxjs'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { OrderByPipe } from 'src/app/classroom/students/pipes/order-by.pipe'
import { DIALOG_CONFIG } from 'src/app/core/core.module'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayFiltersComponent } from 'src/app/shared/components/day-filters/day-filters.component'
import { AgroupByDatePipe } from 'src/app/shared/pipes/agroup-by-date.pipe'
import { DateFilterPipe } from 'src/app/shared/pipes/date-filter.pipe'
import { ExcludeArchivedPipe } from 'src/app/shared/pipes/exclude-archived.pipe'
import { FilterByKeyPipe } from 'src/app/shared/pipes/filter-by-key.pipe'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { ModelService } from 'src/app/shared/services/model.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss'],
  providers: [FilterPipe, DateFilterPipe, ExcludeArchivedPipe, AgroupByDatePipe, OrderByPipe, FilterByKeyPipe]
})
export class DayListComponent implements OnInit, OnDestroy, AfterViewChecked {

  dayList: any[]
  dayListFiltered: any[]
  studentList: any[]

  dayListSubscription: Subscription
  studentListSubscription: Subscription

  @ViewChild(DayFiltersComponent, { static: false }) dayFilters: DayFiltersComponent

  constructor(
    private studentService: StudentService,
    private dayService: DayService,
    private dialog: MatDialog,
    private headerService: HeaderService,
    private cdRef: ChangeDetectorRef,
    private excludeArchivedPipe: ExcludeArchivedPipe,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.headerService.configHeader({ title: 'DAILY', showLogo: true })
    this.loadData()
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges()
  }

  async loadData(): Promise<any> {
    // Get students
    this.studentService.savedStudentList = await this.studentService.getStudentList()

    // Get days
    this.dayListSubscription = this.dayService.observeDayList().subscribe((result) => {
      this.dayList = UtilService.mapCollection(result).map((day: any) => {
        return {
          student: this.studentService.savedStudentList.find((student: any) => student.id === day.studentId),
          ...day
        }
      })

      // Filter the list for first time
      if (this.dayFilters && this.dayList.length) {
        this.dayListFiltered = this.excludeArchivedPipe.transform(this.dayList, this.dayFilters.showArchived)
        this.dayFilters.filterList(this.dayList)
      }
    })

    // Get students
    this.studentListSubscription = this.studentService.observeStudentList().subscribe((result) => {
      this.studentList = UtilService.mapCollection(result)
    })
  }

  createDay(): void {
    if (!this.studentList.length) {
      this.toastService.warning({
        text: 'MSG.DAY_CREATION_DISABLED_NO_STUDENTS',
        action: {
          text: 'ADD_STUDENT',
          f: () => {
            this.router.navigate(['/aula/alumnos'])
            // this.dialog.open(StudentCreationComponent, {
            //   ...DIALOG_CONFIG,
            //   data: {
            //     student: UtilService.clone(ModelService.studenModel)
            //   }
            // })
          }
        }
      })
    } else {
      this.dialog.open(DayCreationComponent, {
        ...DIALOG_CONFIG,
        data: {
          day: ModelService.dayModel
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.dayListSubscription.unsubscribe()
    this.studentListSubscription.unsubscribe()
  }

}
