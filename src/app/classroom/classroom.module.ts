import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'
import { SettingsModule } from './settings/settings.module'
import { StudentsModule } from './students/students.module'

import { ClassroomComponent } from 'src/app/classroom/components/classroom/classroom.component'
import { ClassroomRoutingModule } from './classroom-routing.module'

import { HeaderComponent } from 'src/app/classroom/components/header/header.component'
import { SideMenuComponent } from 'src/app/classroom/components/side-menu/side-menu.component'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [
    ClassroomComponent,

    HeaderComponent,
    SideMenuComponent
  ],
  imports: [
    // Routing
    ClassroomRoutingModule,

    // App modules
    SharedModule,
    StudentsModule,
    SettingsModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class ClassroomModule { }
