import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filterBy'
})
export class FilterPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    if (!array || !args) {
      return array
    }
    return array.filter((elem: any) => {
      const str = this.normalize(JSON.stringify(elem).toLowerCase())
      return str.includes(this.normalize(args.toLowerCase()))
    })
  }

  normalize(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
}
