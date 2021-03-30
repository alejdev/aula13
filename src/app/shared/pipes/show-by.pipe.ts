import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'showBy'
})
export class ShowByPipe implements PipeTransform {

  transform(array: any[], show: boolean, keys: string): any {
    if (!array || !keys) {
      return array
    }
    return array.filter((elem) => this.byString(elem, keys) == show)
  }

  // return elem key value by string
  byString(elem: any, keys: any) {
    keys = keys.replace(/\[(\w+)\]/g, '.$1')
    keys = keys.replace(/^\./, '')
    const split = keys.split('.')

    for (let i = 0, n = split.length; i < n; ++i) {
      const key = split[i]
      if (key in elem) {
        elem = elem[key]
      } else {
        return
      }
    }
    return elem
  }
}
