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
}
