import { Pipe, PipeTransform } from '@angular/core'

import { UtilService } from '../services/util.service'

@Pipe({
  name: 'filterByKey'
})
export class FilterByKeyPipe implements PipeTransform {

  transform(array: any[], object: any, inclusive?: boolean): any {
    if (!array || !object) { return array }

    let list = []
    if (inclusive) {
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          const aux = array.filter((elem) => UtilService.keyByString(elem, property) === object[property])
          list = list.concat(aux.filter((elem) => !list.find((item) => item.id === elem.id)))
        }
      }
    } else {
      list = array
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          list = list.filter((elem) => {
            const asfd = UtilService.keyByString(elem, property)
            return asfd === object[property]
          })
        }
      }
    }
    return list
  }
}
