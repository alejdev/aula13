import { BehaviorSubject, Subscription } from 'rxjs'

import { Injectable, OnDestroy } from '@angular/core'
import { Event, NavigationEnd, Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SidenavService implements OnDestroy {

  public currentUrl = new BehaviorSubject<string>(undefined)
  public appDrawer: any

  router$: Subscription

  constructor(private router: Router) {
    this.router$ = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects)
      }
    })
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe()
  }
}
