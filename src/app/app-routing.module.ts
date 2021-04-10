import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './shared/guards/auth.guard'
import { NoAuthGuard } from './shared/guards/no-auth.guard'

const routes: Routes = [{
  path: 'authentication',
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  canActivate: [NoAuthGuard]
}, {
  path: 'classroom',
  loadChildren: () => import('./classroom/classroom.module').then(m => m.ClassroomModule),
  canActivate: [AuthGuard]
}, {
  path: '', redirectTo: 'classroom', pathMatch: 'full'
}, {
  path: '**', redirectTo: 'classroom'
}]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
