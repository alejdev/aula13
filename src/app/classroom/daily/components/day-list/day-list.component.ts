import { Subscription } from 'rxjs'
import { DayService } from 'src/app/classroom/services/day.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { DayCreationComponent } from 'src/app/shared/components/day-creation/day-creation.component'
import { DayFiltersComponent } from 'src/app/shared/components/day-filters/day-filters.component'
import { DateFilterPipe } from 'src/app/shared/pipes/date-filter.pipe'
import { ExcludeArchivedPipe } from 'src/app/shared/pipes/exclude-archived.pipe'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { ModelService } from 'src/app/shared/services/model.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'a13-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss'],
  providers: [FilterPipe, DateFilterPipe, ExcludeArchivedPipe]
})
export class DayListComponent implements OnInit, OnDestroy, AfterViewInit {

  dayList: any[]
  dayListFiltered: any[]
  studentList: any[]

  dayListSubscription: Subscription

  @ViewChild(DayFiltersComponent, { static: true }) dayFilters: DayFiltersComponent

  constructor(
    private studentService: StudentService,
    private dayService: DayService,
    private dialog: MatDialog,
    private headerService: HeaderService,
    private cdRef: ChangeDetectorRef,
    private excludeArchivedPipe: ExcludeArchivedPipe,
  ) { }

  async ngOnInit(): Promise<any> {
    this.headerService.configHeader({ title: 'DAILY' })
    this.studentService.savedStudentList = await this.studentService.getStudentList()
  }

  ngAfterViewInit() {
    this.loadData()
    this.cdRef.detectChanges()
  }

  loadData(): void {
    this.dayList = []
    this.dayListSubscription = this.dayService.observeDayList().subscribe((result) => {
      this.dayList = UtilService.mapCollection(result).map((day: any) => {
        return {
          student: this.studentService.savedStudentList.find((student: any) => student.id === day.studentId),
          ...day
        }
      })
      this.dayListFiltered = this.excludeArchivedPipe.transform(Object.assign(this.dayList), this.dayFilters.showArchived)
      this.headerService.mergeHeader({ length: this.dayListFiltered.length })
      this.dayFilters.filterList(this.dayList)
    })
  }

  createDay(): void {
    this.dialog.open(DayCreationComponent, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      disableClose: true,
      data: {
        day: ModelService.dayModel
      }
    })
  }

  ngOnDestroy(): void {
    this.dayListSubscription.unsubscribe()
  }

}
