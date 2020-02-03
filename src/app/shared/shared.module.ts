import { NgModule, LOCALE_ID } from '@angular/core'
import { CommonModule, registerLocaleData } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRippleModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatMenuModule } from '@angular/material/menu'

import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material'

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

import { FlexLayoutModule } from '@angular/flex-layout'
import { TranslateModule } from '@ngx-translate/core'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'

import { ToastComponent } from './components/toast/toast.component'
import { DayCardComponent } from './components/day-card/day-card.component'
import { FloatingButtonComponent } from './components/floating-button/floating-button.component'
import { DayCreationComponent } from './components/day-creation/day-creation.component'
import { LoaderComponent } from './components/loader/loader.component'
import { SelectStudentComponent } from './components/select-student/select-student.component'

import { StringByPipe } from './pipes/string-by.pipe'
import { AgePipe } from './pipes/age.pipe'
import { StripHTMLPipe } from './pipes/strip-html.pipe'
import { SubjectNamePipe } from './pipes/subject-name.pipe'
import { ClassroomNamePipe } from './pipes/classroom-name.pipe'
import { SrcImagePipe } from './pipes/src-image.pipe'

import { LoaderService } from './services/loader.service'
import { SettingService } from './services/setting.service'

import localeEs from '@angular/common/locales/es'
import localeEn from '@angular/common/locales/en'
import localeDe from '@angular/common/locales/de'
import localeIt from '@angular/common/locales/it'
import localeFr from '@angular/common/locales/fr'

registerLocaleData(localeEs, 'es')
registerLocaleData(localeEn, 'en')
registerLocaleData(localeDe, 'de')
registerLocaleData(localeIt, 'it')
registerLocaleData(localeFr, 'fr')

import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome'
import { faChevronRight, faUserGraduate, faCog, faBook, faUniversity, faEllipsisV, faTimes, faEye, faEyeSlash, faBars, faSignOutAlt, faMoon, faSun, faStream, faArrowLeft, faPhoneAlt, faPen, faTrash, faPoll, faSignature, faBirthdayCake, faSchool, faUser, faGraduationCap, faChalkboardTeacher, faGuitar, faSearch, faFont, faPlus, faInfo, faExclamation, faSkullCrossbones, faCalendarDay, faFileAlt, faCaretUp, faCaretDown, faChalkboard, faCheck, faStar, faBox, faBoxOpen, faUserPlus, faCalendarPlus, faEdit } from '@fortawesome/free-solid-svg-icons'

@NgModule({
  declarations: [
    ToastComponent,
    FloatingButtonComponent,
    DayCardComponent,
    DayCreationComponent,
    LoaderComponent,
    SelectStudentComponent,

    StringByPipe,
    AgePipe,
    StripHTMLPipe,
    SubjectNamePipe,
    ClassroomNamePipe,
    SrcImagePipe
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatDatepickerModule,

    // Third parties
    FlexLayoutModule,
    TranslateModule,
    CKEditorModule,
    FontAwesomeModule
  ],
  exports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatDatepickerModule,
    MatMenuModule,

    // Third parties
    FlexLayoutModule,
    TranslateModule,
    CKEditorModule,
    FontAwesomeModule,

    // Mine
    StringByPipe,
    AgePipe,
    StripHTMLPipe,
    SubjectNamePipe,
    ClassroomNamePipe,
    SrcImagePipe,
    FloatingButtonComponent,
    DayCardComponent,
    DayCreationComponent,
    LoaderComponent,
    SelectStudentComponent
  ],
  entryComponents: [
    ToastComponent
  ],
  providers: [
    { provide: MatSnackBarConfig, useValue: { horizontalPosition: 'start', duration: 6000 } },
    { provide: LOCALE_ID, deps: [SettingService], useFactory: (settingService: any) => settingService.value.lang },
    LoaderService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class SharedModule {
  constructor(
    faConfig: FaConfig,
    library: FaIconLibrary
  ) {
    faConfig.defaultPrefix = 'fas'
    library.addIcons(
      faArrowLeft,
      faBars,
      faBirthdayCake,
      faBook,
      faBox,
      faBoxOpen,
      faCalendarDay,
      faCalendarPlus,
      faCaretDown,
      faCaretUp,
      faChalkboard,
      faChalkboardTeacher,
      faCheck,
      faChevronRight,
      faCog,
      faEdit,
      faEllipsisV,
      faExclamation,
      faEye,
      faEyeSlash,
      faFileAlt,
      faFont,
      faGraduationCap,
      faGuitar,
      faInfo,
      faMoon,
      faPen,
      faPhoneAlt,
      faPlus,
      faPoll,
      faSchool,
      faSearch,
      faSignature,
      faSignOutAlt,
      faSkullCrossbones,
      faStar,
      faStream,
      faSun,
      faTimes,
      faTrash,
      faUniversity,
      faUser,
      faUserPlus,
      faUserGraduate,
    )
  }
}
