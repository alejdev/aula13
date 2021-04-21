import { ClassroomComponent } from 'src/app/classroom/components/classroom/classroom.component'

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{
  path: '',
  component: ClassroomComponent,
  children: [{
    path: '',
    redirectTo: 'daily',
    pathMatch: 'full'
  }, {
    path: 'daily',
    loadChildren: () => import('./daily/daily.module').then(m => m.DailyModule),
    data: { animation: 'daily' }
  }, {
    path: 'day/:id',
    loadChildren: () => import('./day-profile/day-profile.module').then(m => m.DayProfileModule),
    data: { animation: 'day-profile' }
  }, {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    data: { animation: 'students' }
  }, {
    path: 'student/:id',
    loadChildren: () => import('./student-profile/student-profile.module').then(m => m.StudentProfileModule),
    data: { animation: 'student-profile' }
  }, {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    data: { animation: 'settings' }
  }, {
    path: 'profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
    data: { animation: 'user' }
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
