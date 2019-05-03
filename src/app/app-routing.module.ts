import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AulaComponent } from './components/aula/aula.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'aula', component: AulaComponent,
    children: [
      { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
      { path: 'alumnos', component: StudentListComponent },
      { path: 'asignaturas', component: SubjectListComponent },
      { path: 'configuracion', component: ConfigurationComponent }
    ]
  },  
  { path: '', redirectTo: 'aula', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
