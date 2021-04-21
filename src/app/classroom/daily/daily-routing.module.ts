import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DayListComponent } from './components/day-list/day-list.component'

const routes: Routes = [{
  path: '',
  component: DayListComponent,
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyRoutingModule { }
