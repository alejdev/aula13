import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';

@Component({
  selector: 'a13-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [onMainContentChange]
})
export class AppComponent implements OnInit {
  
  public onSideNavChange: boolean = true;

  constructor(private swUpdate: SwUpdate, private sidenavService: SidenavService) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
      console.log('this.onSideNavChange', res)
    });
  }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }
}
