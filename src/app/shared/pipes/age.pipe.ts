import { Pipe, PipeTransform } from '@angular/core'
import moment from 'moment'

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: any[]): number {
    const today = moment()
    const birthdate = moment(value, 'DD/MM/YYYY')
    return today.diff(birthdate, 'year')
  }

}
