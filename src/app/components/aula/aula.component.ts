import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { onMainContentChange } from 'src/app/animations/animations';

@Component({
  selector: 'a13-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],  
  animations: [onMainContentChange]
})
export class AulaComponent implements OnInit {

  public onSideNavChange: boolean = true;

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
  }

  ngOnInit() {
  }

}
