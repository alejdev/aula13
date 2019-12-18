import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  // Default settings
  private settings: any = {
    theme: 0,
    lang: 'es',
    canPanSideMenu: true
  }

  constructor() { }

  public get value(): any {
    return JSON.parse(localStorage.getItem('a13_settings')) || this.settings
  }

  public set value(value: any) {
    this.settings = { ...this.settings, ...value }
    localStorage.setItem('a13_settings', JSON.stringify(this.settings))
  }
}
