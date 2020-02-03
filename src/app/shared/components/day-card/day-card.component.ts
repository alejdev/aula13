import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'a13-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {

  @Input() day: any = null

  constructor() { }

  ngOnInit(): void { }

}
