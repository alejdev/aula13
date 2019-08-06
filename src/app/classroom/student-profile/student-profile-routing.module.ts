import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { StudentProfileComponent } from './components/student-profile/student-profile.component'

const routes: Routes = [{
  path: '',
  component: StudentProfileComponent,
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProfileRoutingModule { }
