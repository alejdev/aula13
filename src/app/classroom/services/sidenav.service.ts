import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public sidenavState: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor() { }
}
