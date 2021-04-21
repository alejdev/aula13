import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DayProfileComponent } from './components/day-profile/day-profile.component'

const routes: Routes = [{
  path: '',
  component: DayProfileComponent,
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayProfileRoutingModule { }
