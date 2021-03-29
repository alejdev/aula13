import { ClassroomComponent } from 'src/app/classroom/components/classroom/classroom.component'
import { HeaderComponent } from 'src/app/classroom/components/header/header.component'
import { SideMenuComponent } from 'src/app/classroom/components/side-menu/side-menu.component'

import { NgModule } from '@angular/core'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'

import { SharedModule } from '../shared/shared.module'
import { ClassroomRoutingModule } from './classroom-routing.module'
import { ClassroomCreationComponent } from './components/classroom-creation/classroom-creation.component'
import { ClassroomDeleteDialogComponent } from './components/classroom-delete-dialog/classroom-delete-dialog.component'
import { DayDeleteDialogComponent } from './components/day-delete-dialog/day-delete-dialog.component'
import { FooterToolbarComponent } from './components/footer-toolbar/footer-toolbar.component'
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component'
import { StudentArchiveDialogComponent } from './components/student-archive-dialog/student-archive-dialog.component'
import { StudentDeleteDialogComponent } from './components/student-delete-dialog/student-delete-dialog.component'
import { SubjectCreationComponent } from './components/subject-creation/subject-creation.component'
import { SubjectDeleteDialogComponent } from './components/subject-delete-dialog/subject-delete-dialog.component'
import { TitleLogoComponent } from './components/title-logo/title-logo.component'
import { DailyModule } from './daily/daily.module'
import { DayProfileModule } from './day-profile/day-profile.module'
import { SettingsModule } from './settings/settings.module'
import { StudentProfileModule } from './student-profile/student-profile.module'
import { StudentsModule } from './students/students.module'

@NgModule({
  declarations: [
    ClassroomComponent,

    HeaderComponent,
    SideMenuComponent,
    LogoutDialogComponent,
    StudentDeleteDialogComponent,
    StudentArchiveDialogComponent,
    FooterToolbarComponent,
    ClassroomCreationComponent,
    SubjectCreationComponent,
    ClassroomDeleteDialogComponent,
    SubjectDeleteDialogComponent,
    DayDeleteDialogComponent,
    TitleLogoComponent,
  ],
  imports: [
    // Routing
    ClassroomRoutingModule,

    // App modules
    SharedModule,
    StudentsModule,
    StudentProfileModule,
    SettingsModule,
    DailyModule,
    DayProfileModule,

    // Material
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  entryComponents: [
    LogoutDialogComponent,
    StudentDeleteDialogComponent,
    StudentArchiveDialogComponent,
    ClassroomCreationComponent,
    SubjectCreationComponent,
    ClassroomDeleteDialogComponent,
    SubjectDeleteDialogComponent,
    DayDeleteDialogComponent
  ]
})
export class ClassroomModule { }
