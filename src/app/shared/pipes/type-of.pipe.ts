import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'typeOf'
})
export class TypeOfPipe implements PipeTransform {

  transform(value: any, type: string): any {
    return typeof value == type
  }

}
