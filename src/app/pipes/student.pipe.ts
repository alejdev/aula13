import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'student'
})
export class StudentPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    if (!array || !args) {
      return array;
    }
    return array.filter(elem => {
      let str = JSON.stringify(elem).toLowerCase()
      return str.includes(args.toLowerCase())
    });
  }
}
