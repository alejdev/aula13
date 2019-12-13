import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ClassroomComponent } from 'src/app/classroom/components/classroom/classroom.component'

const routes: Routes = [{
  path: '',
  component: ClassroomComponent,
  children: [{
    path: '',
    redirectTo: 'diario',
    pathMatch: 'full'
  }, {
    path: 'diario',
    loadChildren: () => import('./daily/daily.module').then(m => m.DailyModule)
  }, {
    path: 'alumnos',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  }, {
    path: 'alumno/:id',
    loadChildren: () => import('./student-profile/student-profile.module').then(m => m.StudentProfileModule)
  }, {
    path: 'configuracion',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
