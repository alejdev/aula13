import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FlexLayoutModule } from '@angular/flex-layout'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,
    TranslateModule
  ],
  exports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Third parties
    FlexLayoutModule,
    TranslateModule
  ]
})
export class SharedModule { }
