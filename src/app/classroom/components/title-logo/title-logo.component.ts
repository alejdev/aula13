import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'a13-title-logo',
  templateUrl: './title-logo.component.html',
  styleUrls: ['./title-logo.component.scss']
})
export class TitleLogoComponent implements OnInit {

  @Input() showTitle: boolean
  @Input() showLogo: boolean

  constructor() { }

  ngOnInit() { }

}
