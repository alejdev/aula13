import { UtilService } from 'src/app/shared/services/util.service'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'showBy'
})
export class ShowByPipe implements PipeTransform {

  transform(array: any[], show: boolean, keys: string): any {
    if (!array || !keys) {
      return array
    }
    return array.filter((elem) => UtilService.keyByString(elem, keys) == show)
  }
}
