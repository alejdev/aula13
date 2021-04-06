import { environment } from 'src/environments/dev'

import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { MatDialogConfig } from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

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

export const DIALOG_CONFIG: MatDialogConfig = {
  width: 'calc(100vw)',
  maxWidth: '800px',
  autoFocus: false,
  disableClose: true,
  panelClass: 'full-dialog'
}

export const CKEDITOR_CONFIG: any = {
  toolbar: ['bold', 'italic', '|', 'heading', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo', '|', 'blockQuote', 'insertTable', 'indent', 'outdent'],
  options: [
    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
  ]
}

@NgModule({
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    // Firebase
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    // Third parties
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class CoreModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
