import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'classroom'
})
export class ClassroomPipe implements PipeTransform {

  transform(array: any, classrooms: any[]): any {
    if (!array || !classrooms || !classrooms.length) {
      return array
    }

    return array.filter((elem) => {
      return elem.classroom.classrooms.some((item) => classrooms.includes(item))
    })
  }

}
