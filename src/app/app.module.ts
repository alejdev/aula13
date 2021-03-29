import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthenticationModule } from './authentication/authentication.module'
import { ClassroomModule } from './classroom/classroom.module'
import { CoreModule } from './core/core.module'
import { LoaderComponent } from './shared/components/loader/loader.component'
import { SharedModule } from './shared/shared.module'

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
