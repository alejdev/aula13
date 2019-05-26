import { Component, OnInit, } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'a13-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private swUpdate: SwUpdate) { }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload()
      })
    }
  }
}
