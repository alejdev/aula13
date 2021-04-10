import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'a13-footer-toolbar',
  templateUrl: './footer-toolbar.component.html',
  styleUrls: ['./footer-toolbar.component.scss']
})
export class FooterToolbarComponent implements OnInit {

  @Input() sidenav: any

  toolbarItems: any = [{
    name: 'STUDENTS',
    url: 'students',
    icon: 'user-graduate'
  }, {
    name: 'DAILY',
    url: 'daily',
    icon: 'calendar-day'
  }]

  constructor() { }

  ngOnInit(): void { }

  toggleSinenav(): void {
    this.sidenav.toggle()
  }
}
