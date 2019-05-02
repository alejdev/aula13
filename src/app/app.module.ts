import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PupilListComponent } from './components/pupil-list/pupil-list.component';
import { LoginComponent } from './components/login/login.component';
import { AulaComponent } from './components/aula/aula.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    PupilListComponent,
    LoginComponent,
    AulaComponent,
    SubjectListComponent,
    ConfigurationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
