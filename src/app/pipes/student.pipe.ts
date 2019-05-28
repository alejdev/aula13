import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'student'
})
export class StudentPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    if (!array || !args) {
      return array;
    }
    return array.filter((elem: any) => {
      let str = this.normalize(JSON.stringify(elem).toLowerCase())
      return str.includes(this.normalize(args.toLowerCase()))
    });
  }

  normalize(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
