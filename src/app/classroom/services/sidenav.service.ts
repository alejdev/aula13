import { Injectable, OnDestroy } from '@angular/core'
import { Event, NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SidenavService implements OnDestroy {

  public currentUrl = new BehaviorSubject<string>(undefined)
  public appDrawer: any

  routerSubscribe: Subscription

  constructor(private router: Router) {
    this.routerSubscribe = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects)
      }
    })
  }

  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe()
  }
}
