import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatSnackBarConfig, MatSnackBarModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material'

import { FlexLayoutModule } from '@angular/flex-layout'
import { TranslateModule } from '@ngx-translate/core'

import { ToastComponent } from './components/toast/toast.component'
import { HttpConfigInterceptor } from './http-config.interceptor'
import { LoaderService } from './services/loader.service'

@NgModule({
  declarations: [
    ToastComponent
  ],
  entryComponents: [
    ToastComponent
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,

    // Third parties
    FlexLayoutModule,
    TranslateModule
  ],
  exports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatSnackBarModule,
    MatProgressSpinnerModule,

    // Third parties
    FlexLayoutModule,
    TranslateModule,
  ],
  providers: [
    { provide: MatSnackBarConfig, useValue: { horizontalPosition: 'start', duration: 4000 } },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    LoaderService
  ]
})
export class SharedModule { }
