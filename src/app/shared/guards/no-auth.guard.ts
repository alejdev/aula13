import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'

import { AuthService } from '../services/auth.service'

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
          this.router.navigate(['classroom'])
          return false
        } else {
          return true
        }
      })
    )
  }
}
