import { Pipe, PipeTransform } from '@angular/core'
import { ClassroomService } from 'src/app/classroom/services/classroom.service'

@Pipe({
  name: 'classroomName'
})
export class ClassroomNamePipe implements PipeTransform {

  constructor(
    private classroomService: ClassroomService
  ) { }

  transform(value: any, ...args: any[]): any {
    return this.classroomService
      .cachedClassrooms
      .find((elem: any) => elem.id === value)
      .name
  }

}
