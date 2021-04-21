import { ClassroomService } from 'src/app/classroom/services/classroom.service'
import { Classroom } from 'src/app/core/interfaces'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'classroomName'
})
export class ClassroomNamePipe implements PipeTransform {

  constructor(
    private classroomService: ClassroomService
  ) { }

  transform(value: string, ...args: any[]): any {
    const classroom = this.classroomService.cachedClassrooms.find((elem: Classroom) => elem.id === value)
    return classroom ? classroom.name : ''
  }

}
