
import { LoaderService } from 'src/app/shared/services/loader.service'

import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
  selector: 'a13-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading = false
  private loader$

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loader$ = this.loaderService.loaderStatus
      .subscribe(state => this.isLoading = state)
  }

  ngOnDestroy() {
    this.loader$.unsubscribe()
  }
}
