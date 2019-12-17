import { NgModule } from '@angular/core'

import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'

import { ClassroomModule } from './classroom/classroom.module'
import { AuthenticationModule } from './authentication/authentication.module'

import { AppComponent } from './app.component'
import { LoaderComponent } from './shared/components/loader/loader.component'

import { AppRoutingModule } from './app-routing.module'

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
    AuthenticationModule
  ],
  entryComponents: [
    LoaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
