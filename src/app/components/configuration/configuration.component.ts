import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'a13-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  title: string = 'SETTINGS'
  theme: any

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.theme.subscribe((result: any) => {
      this.theme = result
    });
  }

  toggleTheme(): void {
    let currentTheme = this.themeService.getNextTheme(this.theme);
    this.themeService.theme.next(currentTheme)
  }

}
