import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'subject'
})
export class SubjectPipe implements PipeTransform {

  transform(array: any, subjects: any[]): any {
    if (!array || !subjects || !subjects.length) {
      return array
    }

    return array.filter((elem) => {
      return elem.classroom.subjects.some((item) => subjects.includes(item))
    })
  }

}
