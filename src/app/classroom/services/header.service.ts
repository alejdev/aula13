import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public config: BehaviorSubject<any> = new BehaviorSubject({})

  constructor() { }

  public configHeader(data: any) {
    this.config.next(data)
  }

  public mergeHeader(data: any) {
    const config = { ...this.config.getValue(), ...data }
    this.config.next(config)
  }
}
