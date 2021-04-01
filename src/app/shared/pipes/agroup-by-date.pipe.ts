import moment from 'moment'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'agroupByDate'
})
export class AgroupByDatePipe implements PipeTransform {

  transform(array: any, ...args: any[]): any {
    if (!array) { return array }

    const list = array.reverse()

    for (let i = 0; i < list.length; i++) {
      let current = this.resetCurrent(list[i])
      const monthOfCurrent = moment(current.date).format('YYYYMM')
      if (i < array.length - 1) {
        const prev = list[i + 1]
        const monthOfPrev = moment(prev.date).format('YYYYMM')

        if (monthOfCurrent !== monthOfPrev) { current = this.setCurrent(current) }
      } else {
        current = this.setCurrent(current)
      }
    }

    return list.reverse()
  }

  setCurrent(current: any): any {
    current.firstOfMonth = true
    if (moment(current.date).format('YYYY') === moment().format('YYYY')) {
      current.thisYear = true
    }
    return current
  }

  resetCurrent(current: any): any {
    delete current.firstOfMonth
    delete current.thisYear
    return current
  }
}
