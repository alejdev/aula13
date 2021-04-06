import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'a13-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {

  @Input() list: any
  @Input() listFiltered: any

  @Input() listMessage: string
  @Input() listFilteredMessage: string

  constructor() { }

  ngOnInit() { }
}
