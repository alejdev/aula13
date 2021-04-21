import { Classroom, Student } from 'src/app/core/interfaces'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'classroom'
})
export class ClassroomPipe implements PipeTransform {

  transform(array: Student[], classrooms: Classroom[]): Student[] {
    if (!array || !classrooms || !classrooms.length) {
      return array
    }

    return array.filter((student: Student) => {
      return student.classroom.classrooms.some((classroom: Classroom) => classrooms.includes(classroom))
    })
  }

}
