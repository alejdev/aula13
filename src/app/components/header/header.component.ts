import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'a13-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  title = 'Aula 13';

  constructor() { }

  ngOnInit() {
  }

}
