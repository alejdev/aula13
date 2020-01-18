import { Pipe, PipeTransform } from '@angular/core'
import moment from 'moment'

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const today = moment()
    const birthdate = moment(value, 'YYYY-MM-DD')
    return today.diff(birthdate, 'year')
  }

}
