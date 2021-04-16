import { Student } from 'src/app/core/interfaces'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'agroupBy'
})
export class AgroupByPipe implements PipeTransform {

  transform(array: Student[], group?: string): Student[] {
    if (!array) { return array }

    switch (group) {
      case 'favorite':
        return array.filter((student: Student) => student.favorite && !student.archived)
      case 'archived':
        return array.filter((student: Student) => student.archived)
      default:
        return array.filter((student: Student) => !student.favorite && !student.archived)
    }
  }

}
