import { SettingService } from 'src/app/shared/services/setting.service'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'settingValue'
})
export class SettingValuePipe implements PipeTransform {

  constructor(
    private settingService: SettingService
  ) { }

  transform(value: any, ...args: any[]): any {
    const setting = this.settingService.value
    if (!value || !setting || !setting[value]) { return value }
    return setting[value]
  }

}
