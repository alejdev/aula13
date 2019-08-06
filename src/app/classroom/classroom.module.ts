import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'
import { SettingsModule } from './settings/settings.module'
import { StudentsModule } from './students/students.module'
import { StudentProfileModule } from './student-profile/student-profile.module'

import { ClassroomComponent } from 'src/app/classroom/components/classroom/classroom.component'
import { ClassroomRoutingModule } from './classroom-routing.module'

import { HeaderComponent } from 'src/app/classroom/components/header/header.component'
import { SideMenuComponent } from 'src/app/classroom/components/side-menu/side-menu.component'
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDialogModule } from '@angular/material'

@NgModule({
  declarations: [
    ClassroomComponent,

    HeaderComponent,
    SideMenuComponent,
    LogoutDialogComponent,
  ],
  imports: [
    // Routing
    ClassroomRoutingModule,

    // App modules
    SharedModule,
    StudentsModule,
    StudentProfileModule,
    SettingsModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule
  ],
  entryComponents: [
    LogoutDialogComponent
  ]
})
export class ClassroomModule { }
