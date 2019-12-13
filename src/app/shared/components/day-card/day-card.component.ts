import { Component, OnInit, Input } from '@angular/core'

import { UtilService } from 'src/app/shared/services/util.service'

@Component({
  selector: 'a13-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {

  @Input() day: any = null
  srcImage: any = UtilService.srcImage

  constructor() { }

  ngOnInit(): void { }

}
