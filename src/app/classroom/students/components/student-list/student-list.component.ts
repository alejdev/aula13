import { combineLatest, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { HeaderService } from 'src/app/classroom/services/header.service'
import { StudentService } from 'src/app/classroom/services/student.service'
import { SubjectService } from 'src/app/classroom/services/subject.service'
import { DIALOG_CONFIG, SKELETON_CONFIG } from 'src/app/core/settings'
import { StudentFiltersComponent } from 'src/app/shared/components/student-filters/student-filters.component'
import { FilterPipe } from 'src/app/shared/pipes/filter-by.pipe'
import { LoaderService } from 'src/app/shared/services/loader.service'
import { ModelService } from 'src/app/shared/services/model.service'
import { SettingService } from 'src/app/shared/services/setting.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

import { AgroupByPipe } from '../../pipes/agroup-by.pipe'
import { ClassroomPipe } from '../../pipes/classroom.pipe'
import { OrderByPipe } from '../../pipes/order-by.pipe'
import { SubjectPipe } from '../../pipes/subject.pipe'
import { StudentCreationComponent } from '../student-creation/student-creation.component'

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [FilterPipe, ClassroomPipe, SubjectPipe, AgroupByPipe, OrderByPipe]
})
export class StudentListComponent implements OnInit, AfterViewChecked {

  data$: Observable<any>

  studentListFiltered: any[]
  favoriteListFiltered: any[]
  restListFiltered: any[]
  archiveListFiltered: any[]

  @ViewChild(StudentFiltersComponent, { static: false }) studentFilters: StudentFiltersComponent

  grid: boolean = this.settingService.value.gridStudentLayout
  skeleton: any = SKELETON_CONFIG
  toggleConfig: any = {
    favorite: {
      show: true,
      text: 'FAVORITES',
      icon: 'caret-up'
    },
    rest: {
      show: true,
      text: 'STUDENTS',
      icon: 'caret-up'
    },
    archived: {
      show: false,
      text: 'ARCHIVED_STUDENTS',
      icon: 'caret-down'
    }
  }

  constructor(
    private studentService: StudentService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private headerService: HeaderService,
    private dialog: MatDialog,
    private agroupByPipe: AgroupByPipe,
    private cdRef: ChangeDetectorRef,
    public router: Router,
    private loaderService: LoaderService,
    private settingService: SettingService,
  ) { }

  ngOnInit(): void {
    this.headerService.configHeader({ title: 'STUDENTS', showLogo: true, showProfile: true })
    this.loadData()
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges()
  }

  loadData(): void {
    const studentList$ = this.studentService.observeStudentList()
    const classroomList$ = this.classroomService.observeClassroomList()
    const subjectList$ = this.subjectService.observeSubjectList()

    this.data$ = combineLatest([studentList$, classroomList$, subjectList$]).pipe(
      tap(() => this.loaderService.load()),
      map((result) => {
        return UtilService.mapCollection(result[0]).map((student) => ({
          ...student,
          classrooms: UtilService.mapCollection(result[1])
            .filter((classroom: any) => student.classroom.classrooms.includes(classroom.id)),
          subjects: UtilService.mapCollection(result[2])
            .filter((subject: any) => student.classroom.subjects.includes(subject.id))
        }))
      }),
      tap((studentList) => {
        this.loaderService.down()
        if (this.studentFilters) {
          this.studentListFiltered = UtilService.clone(studentList)
          this.studentFilters.filterList(studentList)
        }
      })
    )
  }

  createStudent(): void {
    this.dialog.open(StudentCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        student: UtilService.clone(ModelService.studenModel)
      }
    })
  }

  agroupStudents($event: any): void {
    this.studentListFiltered = $event
    this.favoriteListFiltered = this.agroupByPipe.transform($event, 'favorite')
    this.restListFiltered = this.agroupByPipe.transform($event)
    this.archiveListFiltered = this.agroupByPipe.transform($event, 'archived')
  }

  switchLayout(): void {
    this.settingService.value = { gridStudentLayout: !this.settingService.value.gridStudentLayout }
    this.grid = this.settingService.value.gridStudentLayout
  }

  showMore(list: string, show?: boolean): void {
    const state = typeof show === 'undefined' ? !this.toggleConfig[list].show : show
    this.toggleConfig[list].show = state
    this.toggleConfig[list].icon = `caret-${!state ? 'down' : 'up'}`
  }
}
