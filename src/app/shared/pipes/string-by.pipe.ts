import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'stringBy'
})
export class StringByPipe implements PipeTransform {

  transform(value: any, trueString: string, falseString: string): string {
    return value ? trueString : falseString
  }

}
