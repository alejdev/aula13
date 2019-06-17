import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatSnackBarConfig, MatSnackBarModule } from '@angular/material'

import { FlexLayoutModule } from '@angular/flex-layout'
import { TranslateModule } from '@ngx-translate/core'

import { ToastComponent } from './components/toast/toast.component'

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
    MatSnackBarModule,

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

    // Third parties
    FlexLayoutModule,
    TranslateModule,
  ],
  providers: [
    { provide: MatSnackBarConfig, useValue: { horizontalPosition: 'start', duration: 4000 } }
  ]
})
export class SharedModule { }
