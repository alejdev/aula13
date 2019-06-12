import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ClassroomComponent } from 'src/app/classroom/components/classroom/classroom.component'

const routes: Routes = [{
  path: '',
  component: ClassroomComponent,
  children: [
    { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
    { path: 'alumnos', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
    { path: 'alumno/:id', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
    { path: 'configuracion', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }



