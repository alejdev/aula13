import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PupilListComponent } from './components/pupil-list/pupil-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'alumnos', component: PupilListComponent },
  { path: 'asignaturas', component: PupilListComponent },
  { path: 'configuracion', component: PupilListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
