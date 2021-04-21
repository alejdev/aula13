import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'

import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getStatus().pipe(
      map((status: any) => {
        if (status) {
          this.authService.userUid = status.uid
          return true
        } else {
          this.router.navigate(['/authentication'])
          return false
        }
      })
    )
  }
}

