import { NgModule } from '@angular/core'

import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'

import { ClassroomModule } from './classroom/classroom.module'
import { AuthenticationModule } from './authentication/authentication.module'

import { AppComponent } from './app.component'

import { AppRoutingModule } from './app-routing.module'

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader'

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#357fc7',
  fgsColor: '#357fc7',
  bgsType: SPINNER.ballScaleMultiple,
  fgsType: SPINNER.circle,
  hasProgressBar: false,
  overlayColor: 'rgba(127, 127, 127, .5)',
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
  bootstrap: [AppComponent]
})
export class AppModule { }
