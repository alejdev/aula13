import { DEFAULT_SETTINGS } from 'src/app/core/core.module'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor() { }

  public get value(): any {
    return JSON.parse(localStorage.getItem('a13_settings')) || DEFAULT_SETTINGS
  }

  public set value(value: any) {
    localStorage.setItem('a13_settings', JSON.stringify({ ...DEFAULT_SETTINGS, ...value }))
  }
}
