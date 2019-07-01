import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'

import { AuthGuard } from './shared/auth.guard'
import { NoAuthGuard } from './shared/no-auth.guard'

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  canActivate: [NoAuthGuard]
}, {
  path: 'aula',
  loadChildren: () => import('./classroom/classroom.module').then(m => m.ClassroomModule),
  canActivate: [AuthGuard]
}, {
  path: '', redirectTo: 'aula', pathMatch: 'full'
}, {
  path: '**', redirectTo: 'aula'
}]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
