import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, config: any): any {
    if (!value || !config) {
      return null
    }

    var reverse = 1;
    if (config.startsWith('-')) {
      config = config.substring(1)
      reverse = -1
    }

    value.sort((a: any, b: any) => {
      if (a[config] < b[config]) {
        return -1 * reverse
      } else if (a[config] > b[config]) {
        return 1 * reverse
      }
      return 0
    })

    return value;
  }
}