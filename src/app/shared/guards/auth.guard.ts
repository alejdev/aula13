import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'

import { AngularFirestore } from '@angular/fire/firestore'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthService } from '.././services/auth.service'
import { LoaderService } from '../services/loader.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private firestore: AngularFirestore
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getStatus().pipe(
      map((status: any) => {
        if (status) {
          this.authService.setUserUid(status.uid)
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      })
    )
  }
}

