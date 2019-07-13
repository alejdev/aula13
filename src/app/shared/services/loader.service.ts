import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { NgxUiLoaderService } from 'ngx-ui-loader'

@Injectable()
export class LoaderService {

  isLoading: Subject<boolean> = new Subject<boolean>()

  constructor(
    private loader: NgxUiLoaderService
  ) { }

  public start() {
    this.isLoading.next(true)
    this.loader.start()
  }

  public stop() {
    this.isLoading.next(false)
    this.loader.stop()
  }
}
