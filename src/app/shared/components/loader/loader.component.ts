
import { Observable } from 'rxjs'
import { LoaderService } from 'src/app/shared/services/loader.service'

import { Component, OnInit } from '@angular/core'

import { NetworkService } from '../../services/network.service'

@Component({
  selector: 'a13-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loader$ = this.loaderService.getStatus()
  isOnline$: Observable<any>

  constructor(
    private loaderService: LoaderService,
    private networkService: NetworkService,
  ) { }

  ngOnInit(): void {
    this.isOnline$ = this.networkService.getStatus()
  }
}
