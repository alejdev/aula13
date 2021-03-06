import { Day, Student } from 'src/app/core/interfaces'
import { UtilService } from 'src/app/shared/services/util.service'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], config: string): any[] {
    if (!array || !config) {
      return null
    }

    let reverse = 1
    if (config.startsWith('-')) {
      config = config.substring(1)
      reverse = -1
    }

    array.sort((a: Student | Day, b: Student | Day) => {
      if (UtilService.keyByString(a, config) < UtilService.keyByString(b, config)) {
        return -1 * reverse
      } else if (UtilService.keyByString(a, config) > UtilService.keyByString(b, config)) {
        return 1 * reverse
      }
      return 0
    })

    return array
  }
}
