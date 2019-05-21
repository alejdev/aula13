import { Component, OnInit, HostBinding } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ThemeService } from './services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'a13-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass: string

  constructor(private swUpdate: SwUpdate, private themeService: ThemeService, private overlayContainer: OverlayContainer) {
    this.themeService.theme.subscribe((result: any) => {
      this.overlayContainer.getContainerElement().classList.add(result.id)
      this.componentCssClass = result.id
    });
  }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload()
      })
    }
  }
}
