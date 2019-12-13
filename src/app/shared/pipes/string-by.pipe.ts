import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'stringBy'
})
export class StringByPipe implements PipeTransform {

  transform(value: any, trueString: string, falseString: string): any {
    return value ? trueString : falseString
  }

}
