import { Student, Subject } from 'src/app/core/interfaces'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'subject'
})
export class SubjectPipe implements PipeTransform {

  transform(array: Student[], subjects: any[]): Student[] {
    if (!array || !subjects || !subjects.length) {
      return array
    }

    return array.filter((student: Student) => {
      return student.classroom.subjects.some((subject: Subject) => subjects.includes(subject))
    })
  }
}
