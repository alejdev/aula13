import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'

import { CommonModule, registerLocaleData } from '@angular/common'
import localeDe from '@angular/common/locales/de'
import localeEn from '@angular/common/locales/en'
import localeEs from '@angular/common/locales/es'
import localeFr from '@angular/common/locales/fr'
import localeIt from '@angular/common/locales/it'
import { LOCALE_ID, NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MAT_DATE_FORMATS, MatDividerModule, MatSlideToggleModule, MatTooltipModule } from '@angular/material'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { DateAdapter, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { RouterModule } from '@angular/router'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faWhatsapp as fasWhastapp } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faBars, faBirthdayCake, faBook, faBorderStyle, faBox, faBoxOpen, faCalendar, faCalendarDay, faCalendarPlus, faCaretDown, faCaretUp, faChalkboard, faChalkboardTeacher, faCheck, faChevronRight, faCog, faCopy, faEdit, faEllipsisV, faExclamation, faEye, faEyeSlash, faFileAlt, faFilter, faFont, faGraduationCap, faGripLines, faHeart, faInfo, faListUl, faMoon, faMusic, faPen, faPhoneAlt, faPlus, faPoll, faSchool, faSearch, faSearchMinus, faSignature, faSignOutAlt, faSkullCrossbones, faSortAlphaDown, faSortAlphaUpAlt, faSortAmountDown, faSortAmountUpAlt, faSpinner, faSquare, faStar, faStream, faSun, faSyncAlt, faTh, faTimes, faTrash, faUniversity, faUser, faUserGraduate, faUserPlus, faWindowMinimize, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { TranslateModule } from '@ngx-translate/core'

import { Language } from '../core/interfaces'
import { MY_DATE_FORMATS } from '../core/settings'
import { DayCardComponent } from './components/day-card/day-card.component'
import { DayCreationComponent } from './components/day-creation/day-creation.component'
import { DayFiltersComponent } from './components/day-filters/day-filters.component'
import { EmptyListComponent } from './components/empty-list/empty-list.component'
import { FloatingButtonComponent } from './components/floating-button/floating-button.component'
import { LoaderComponent } from './components/loader/loader.component'
import { MenuOptionsComponent } from './components/menu-options/menu-options.component'
import { NoNetworkComponent } from './components/no-network/no-network.component'
import { SelectStudentComponent } from './components/select-student/select-student.component'
import { StudentFiltersComponent } from './components/student-filters/student-filters.component'
import { ToastComponent } from './components/toast/toast.component'
import { ScrollableDirective } from './directives/scrollable.directive'
import { AgePipe } from './pipes/age.pipe'
import { AgroupByDatePipe } from './pipes/agroup-by-date.pipe'
import { ClassroomNamePipe } from './pipes/classroom-name.pipe'
import { DateFilterPipe } from './pipes/date-filter.pipe'
import { ExcludeArchivedPipe } from './pipes/exclude-archived.pipe'
import { FilterByKeyPipe } from './pipes/filter-by-key.pipe'
import { FilterPipe } from './pipes/filter-by.pipe'
import { PhonePipe } from './pipes/phone.pipe'
import { SettingValuePipe } from './pipes/setting-value.pipe'
import { ShowByPipe } from './pipes/show-by.pipe'
import { SrcImagePipe } from './pipes/src-image.pipe'
import { StringByPipe } from './pipes/string-by.pipe'
import { StripHTMLPipe } from './pipes/strip-html.pipe'
import { SubjectNamePipe } from './pipes/subject-name.pipe'
import { TypeOfPipe } from './pipes/type-of.pipe'
import { SettingService } from './services/setting.service'

registerLocaleData(localeEs, Language.es)
registerLocaleData(localeEn, Language.en)
registerLocaleData(localeDe, Language.en)
registerLocaleData(localeIt, Language.it)
registerLocaleData(localeFr, Language.fr)

@NgModule({
  declarations: [
    ToastComponent,
    FloatingButtonComponent,
    DayCardComponent,
    DayCreationComponent,
    LoaderComponent,
    SelectStudentComponent,
    StudentFiltersComponent,
    DayFiltersComponent,
    EmptyListComponent,
    MenuOptionsComponent,
    NoNetworkComponent,

    ScrollableDirective,

    StringByPipe,
    AgePipe,
    StripHTMLPipe,
    SubjectNamePipe,
    ClassroomNamePipe,
    SrcImagePipe,
    FilterPipe,
    DateFilterPipe,
    ShowByPipe,
    ExcludeArchivedPipe,
    AgroupByDatePipe,
    SettingValuePipe,
    FilterByKeyPipe,
    TypeOfPipe,
    PhonePipe,
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
    MatSlideToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,

    // Third parties
    FlexLayoutModule,
    TranslateModule,
    CKEditorModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule
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
    MatSlideToggleModule,
    MatTooltipModule,
    MatDividerModule,

    // Third parties
    FlexLayoutModule,
    TranslateModule,
    CKEditorModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,

    // Mine
    FloatingButtonComponent,
    DayCardComponent,
    DayCreationComponent,
    LoaderComponent,
    SelectStudentComponent,
    StudentFiltersComponent,
    DayFiltersComponent,
    EmptyListComponent,
    MenuOptionsComponent,

    ScrollableDirective,

    StringByPipe,
    AgePipe,
    StripHTMLPipe,
    SubjectNamePipe,
    ClassroomNamePipe,
    SrcImagePipe,
    FilterPipe,
    DateFilterPipe,
    ShowByPipe,
    ExcludeArchivedPipe,
    AgroupByDatePipe,
    SettingValuePipe,
    TypeOfPipe,
    PhonePipe,
  ],
  entryComponents: [
    ToastComponent
  ],
  providers: [
    { provide: MatSnackBarConfig, useValue: { horizontalPosition: 'start', duration: 6000 } },
    { provide: LOCALE_ID, deps: [SettingService], useFactory: (settingService: any) => settingService.value.lang },
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
      faBorderStyle,
      faBox,
      faBoxOpen,
      faCalendar,
      faCalendarDay,
      faCalendarPlus,
      faCaretDown,
      faCaretUp,
      faChalkboard,
      faChalkboardTeacher,
      faCheck,
      faChevronRight,
      faCog,
      faCopy,
      faEdit,
      faEllipsisV,
      faExclamation,
      faEye,
      faEyeSlash,
      faFileAlt,
      faFilter,
      faFont,
      faGraduationCap,
      faGripLines,
      faHeart,
      faInfo,
      faListUl,
      faMoon,
      faMusic,
      faPen,
      faPhoneAlt,
      faPlus,
      faPoll,
      faSchool,
      faSearch,
      faSearchMinus,
      faSignature,
      faSignOutAlt,
      faSkullCrossbones,
      faSortAlphaDown,
      faSortAlphaUpAlt,
      faSortAmountDown,
      faSortAmountUpAlt,
      faSpinner,
      faSquare,
      faStar,
      faStream,
      faSun,
      faSyncAlt,
      faTh,
      faTimes,
      faTrash,
      faUniversity,
      faUser,
      faUserGraduate,
      faUserPlus,
      faWindowMinimize,
      fasWhastapp as IconDefinition
    )
  }
}
