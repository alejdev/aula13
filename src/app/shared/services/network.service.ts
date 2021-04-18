import { BehaviorSubject, fromEvent, Observable } from 'rxjs'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private isOnline$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(window.navigator.onLine)

  constructor() {
    fromEvent(window, 'online').subscribe(e => this.setStatus(true))
    fromEvent(window, 'offline').subscribe(e => this.setStatus(false))
  }

  // Get satus of network
  getStatus(): Observable<boolean> {
    return this.isOnline$.asObservable()
  }

  setStatus(status: boolean) {
    this.isOnline$.next(status)
  }
}
