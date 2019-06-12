import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { StudentListComponent } from './components/student-list/student-list.component'

const routes: Routes = [{
  path: '',
  component: StudentListComponent,
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
