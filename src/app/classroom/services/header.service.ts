import { BehaviorSubject } from 'rxjs'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public config: BehaviorSubject<any> = new BehaviorSubject({})
  public _searchStatus: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor() { }

  public configHeader(data: any): void {
    this.config.next(data)
  }

  get searchStatus() {
    return this._searchStatus.value
  }

  set searchStatus(value) {
    this._searchStatus.next(value)
  }

  public toggleSearch(): void {
    this.searchStatus = !this.searchStatus.valueOf()
  }

  public mergeHeader(data: any): void {
    const config = { ...this.config.getValue(), ...data }
    this.config.next(config)
  }
}
