import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class LoaderService {

  private activeRequests: number = 0
  private loadingValue: boolean = false
  public loadingStatus: BehaviorSubject<boolean> = new BehaviorSubject(false)

  get loading(): boolean {
    return this.loadingValue
  }

  set loading(value) {
    this.loadingValue = value
    this.loadingStatus.next(value)
  }

  public start() {
    if (this.activeRequests === 0) {
      this.loading = true
    }
    this.activeRequests++
  }

  public stop() {
    this.activeRequests--
    if (this.activeRequests === 0) {
      this.loading = false
    }
  }
}
