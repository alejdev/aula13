import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'

import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'

import { ClassroomModule } from './classroom/classroom.module'
import { AuthenticationModule } from './authentication/authentication.module'

import { AppComponent } from './app.component'

import { AppRoutingModule } from './app-routing.module'

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader'

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#0259af',
  fgsColor: '#0259af',
  bgsType: SPINNER.ballScaleMultiple,
  fgsType: SPINNER.circle,
  hasProgressBar: false,
  overlayColor: 'rgba(160, 160, 160, 0.3)',
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserAnimationsModule,
    BrowserModule,

    // Routing
    AppRoutingModule,

    // App modules
    CoreModule,
    SharedModule,
    ClassroomModule,
    AuthenticationModule,

    // Third parties
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
