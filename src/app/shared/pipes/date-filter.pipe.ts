import { Moment } from 'moment'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(array: any, ...args: Moment[]): any {
    if (!array || (!args[0] && !args[1]) || (!args[0].isValid() && !args[1].isValid())) {
      return array
    }

    let data = array

    if (args[0] && args[0].isValid()) {
      data = data.filter((elem) => elem.date >= args[0].valueOf())
    }

    if (args[1] && args[1].isValid()) {
      data = data.filter((elem) => elem.date <= args[1].valueOf())
    }

    return data
  }

}
