import { combineLatest, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { OrderByPipe } from 'src/app/classroom/students/pipes/order-by.pipe'
import { DAY_MODEL } from 'src/app/core/models'
import { DIALOG_CONFIG, SKELETON_CONFIG } from 'src/app/core/settings'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayFiltersComponent } from 'src/app/shared/components/day-filters/day-filters.component'
import { AgroupByDatePipe } from 'src/app/shared/pipes/agroup-by-date.pipe'
import { DateFilterPipe } from 'src/app/shared/pipes/date-filter.pipe'
import { ExcludeArchivedPipe } from 'src/app/shared/pipes/exclude-archived.pipe'
import { FilterByKeyPipe } from 'src/app/shared/pipes/filter-by-key.pipe'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { SettingService } from 'src/app/shared/services/setting.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss'],
  providers: [FilterPipe, DateFilterPipe, ExcludeArchivedPipe, AgroupByDatePipe, OrderByPipe, FilterByKeyPipe]
})
export class DayListComponent implements OnInit, AfterViewChecked {

  data$: Observable<any>
  studentList: any[]

  dayListFiltered: any[]
  @ViewChild(DayFiltersComponent, { static: false }) dayFilters: DayFiltersComponent

  grid: boolean = this.settingService.value.gridDailyLayout
  skeleton: any = SKELETON_CONFIG

  constructor(
    private studentService: StudentService,
    private dayService: DayService,
    private dialog: MatDialog,
    private headerService: HeaderService,
    private cdRef: ChangeDetectorRef,
    private excludeArchivedPipe: ExcludeArchivedPipe,
    private toastService: ToastService,
    public router: Router,
    private loaderService: LoaderService,
    private settingService: SettingService,
    ) { }

  ngOnInit(): void {
    this.headerService.configHeader({ title: 'DAILY', showLogo: true, showProfile: true })
    this.loadData()
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges()
  }

  async loadData(): Promise<any> {
    const dayList$ = this.dayService.observeDayList()
    const studentList$ = this.studentService.observeStudentList()

    this.data$ = combineLatest([dayList$, studentList$]).pipe(
      tap(() => this.loaderService.load()),
      map((result) => {
        this.studentList = UtilService.mapCollection(result[1])
        return UtilService.mapCollection(result[0]).map((day) => ({
          ...day,
          student: this.studentList.find((student: any) => student.id === day.studentId),
        }))
      }),
      tap((dayList) => {
        this.loaderService.down()
        if (this.dayFilters) {
          this.dayListFiltered = this.excludeArchivedPipe.transform(dayList, this.dayFilters.showArchived)
          this.dayFilters.filterList(dayList)
        }
      })
    )
  }

  createDay(): void {
    if (!this.studentList.length) {
      this.toastService.warning({
        text: 'MSG.DAY_CREATION_DISABLED_NO_STUDENTS',
        navigate: {
          text: 'ADD_STUDENT',
          route: ['classroom/students']
        }
      })
    } else {
      this.dialog.open(DayCreationComponent, {
        ...DIALOG_CONFIG,
        data: {
          day: UtilService.clone(DAY_MODEL)
        }
      })
    }
  }

  switchLayout(): void {
    this.settingService.value = { gridDailyLayout: !this.settingService.value.gridDailyLayout }
    this.grid = this.settingService.value.gridDailyLayout
  }
}
