import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'agroupBy'
})
export class AgroupByPipe implements PipeTransform {

  transform(array: any, group: string): any {
    if (!array) { return array }

    switch (group) {
      case 'favorite':
        return array.filter(student => student.favorite && !student.archived)
      case 'archived':
        return array.filter(student => student.archived)
      default:
        return array.filter(student => !student.favorite && !student.archived)
    }
  }

}
