import { NgModule, LOCALE_ID } from '@angular/core'
import { CommonModule, registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
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
import { MatSnackBarConfig } from '@angular/material/snack-bar'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatDatepickerModule } from '@angular/material/datepicker'

import { FlexLayoutModule } from '@angular/flex-layout'
import { TranslateModule } from '@ngx-translate/core'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'

import { ToastComponent } from './components/toast/toast.component'
import { DayCardComponent } from './components/day-card/day-card.component'
import { FloatingButtonComponent } from './components/floating-button/floating-button.component'
import { DayCreationComponent } from './components/day-creation/day-creation.component'

import { StringByPipe } from './pipes/string-by.pipe'

import { HttpConfigInterceptor } from './http-config.interceptor'
import { LoaderService } from './services/loader.service'

import localeEs from '@angular/common/locales/es'
import localeEn from '@angular/common/locales/en'
import localeDe from '@angular/common/locales/de'
import localeIt from '@angular/common/locales/it'
import localeFr from '@angular/common/locales/fr'
import { SettingService } from './services/setting.service'

registerLocaleData(localeEs, 'es')
registerLocaleData(localeEn, 'en')
registerLocaleData(localeDe, 'de')
registerLocaleData(localeIt, 'it')
registerLocaleData(localeFr, 'fr')

@NgModule({
  declarations: [
    ToastComponent,
    FloatingButtonComponent,
    DayCardComponent,
    DayCreationComponent,

    StringByPipe
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
    CKEditorModule
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

    // Third parties
    FlexLayoutModule,
    TranslateModule,
    CKEditorModule,

    // Mine
    StringByPipe,
    FloatingButtonComponent,
    DayCardComponent,
    DayCreationComponent
  ],
  entryComponents: [
    ToastComponent
  ],
  providers: [
    { provide: MatSnackBarConfig, useValue: { horizontalPosition: 'start', duration: 5000 } },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: LOCALE_ID, deps: [SettingService], useFactory: (settingService: any) => settingService.value.lang },
    LoaderService
  ]
})
export class SharedModule { }
