import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { LoaderService } from 'src/app/shared/services/loader.service'

@Component({
  selector: 'a13-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading: boolean = false
  loadingSubscription: Subscription

  constructor(
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {

    // Loading status
    this.loadingSubscription = this.loaderService.loadingStatus.subscribe((result) => {
      this.isLoading = result
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }

}
