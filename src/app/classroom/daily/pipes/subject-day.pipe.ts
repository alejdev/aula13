import { Day } from 'src/app/core/interfaces'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'subjectDay'
})
export class SubjectDayPipe implements PipeTransform {

  transform(array: Day[], subjects: any[]): Day[] {
    if (!array || !subjects || !subjects.length) {
      return array
    }

    return array.filter((day: Day) => subjects.includes(day.subjectId))
  }

}
