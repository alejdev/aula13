

import { DEFAULT_SETTINGS, DefaultSettings } from 'src/app/core/core.module'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor() { }

  public get value(): DefaultSettings {
    const localValue = JSON.parse(localStorage.getItem('a13_settings'))
    return localValue ? this.normalizeSettings(localValue) : DEFAULT_SETTINGS
  }

  public set value(value: DefaultSettings) {
    localStorage.setItem('a13_settings', JSON.stringify({ ...this.value, ...value }))
  }

  private normalizeSettings(data: any): DefaultSettings {
    // Set new props
    for (const key in DEFAULT_SETTINGS) {
      if (!data.hasOwnProperty(key)) {
        data[key] = DEFAULT_SETTINGS[key]
      }
    }

    // Remove old props
    for (const key in data) {
      if (!DEFAULT_SETTINGS.hasOwnProperty(key)) {
        delete data[key]
      }
    }
    return data
  }
}
