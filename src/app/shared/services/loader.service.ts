import { Subject } from 'rxjs'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private count = 0
  private loading$ = new Subject<boolean>()
  public loaderStatus = this.loading$.asObservable()

  constructor() { }

  load(): void {
    if (this.count === 0) {
      this.setRequestStatus(true)
    }
    this.count++
  }

  down(): void {
    this.count--
    if (this.count === 0) {
      this.setRequestStatus(false)
    }
  }

  setRequestStatus(inprogess: boolean) {
    this.loading$.next(inprogess)
  }
}
