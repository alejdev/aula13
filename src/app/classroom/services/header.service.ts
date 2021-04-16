import { BehaviorSubject } from 'rxjs'
import { HeaderConfig } from 'src/app/core/interfaces'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public config: BehaviorSubject<HeaderConfig> = new BehaviorSubject({})

  constructor() { }

  public configHeader(config: HeaderConfig): void {
    this.config.next(config)
  }

  public mergeHeader(config: HeaderConfig): void {
    this.config.next({ ...this.config.value, ...config })
  }
}
