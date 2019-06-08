import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component'

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
}, {
  path: 'aula',
  loadChildren: () => import('./classroom/classroom.module').then(m => m.ClassroomModule)
}, {
  path: '', redirectTo: 'aula', pathMatch: 'full'
}, {
  path: '**', component: PageNotFoundComponent
}]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
