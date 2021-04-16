
import { LoaderService } from 'src/app/shared/services/loader.service'

import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'a13-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loader$ = this.loaderService.getStatus()

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void { }
}
