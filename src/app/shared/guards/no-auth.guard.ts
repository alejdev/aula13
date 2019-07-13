import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthService } from './../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getStatus().pipe(
      map(status => {
        if (status) {
          this.router.navigate(['aula'])
          return false
        } else {
          return true
        }
      })
    )
  }
}
