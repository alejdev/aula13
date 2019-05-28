import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  // Default settings
  private _settings: any = {
    theme: 0,
    lang: 'es'
  }

  constructor() { }

  public get value(): any {
    return JSON.parse(localStorage.getItem('a13_settings')) || this._settings
  }

  public set value(value: any) {
    this._settings = { ...this._settings, ...value }
    localStorage.setItem('a13_settings', JSON.stringify(this._settings))
  }
}
