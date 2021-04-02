import { ThemeService } from 'src/app/shared/services/theme.service'

import { Component, HostBinding, OnInit } from '@angular/core'

@Component({
  selector: 'a13-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  @HostBinding('class') componentCssClass: string

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    // Set theme
    this.themeService.setTheme(0)
    this.componentCssClass = this.themeService.getThemeByIndex(0).id
  }

}
