import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ClassroomComponent } from 'src/app/classroom/pages/classroom/classroom.component'
import { ConfigurationComponent } from 'src/app/classroom/pages/configuration/configuration.component'
import { StudentListComponent } from 'src/app/classroom/pages/student-list/student-list.component'
import { SubjectListComponent } from 'src/app/classroom/pages/subject-list/subject-list.component'

const routes: Routes = [{
  path: '',
  component: ClassroomComponent,
  children: [
    { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
    { path: 'alumnos', component: StudentListComponent },
    { path: 'alumno/:id', component: StudentListComponent },
    { path: 'asignaturas', component: SubjectListComponent },
    { path: 'configuracion', component: ConfigurationComponent }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }



