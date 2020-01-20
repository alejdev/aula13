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
    const classroomList = this.classroomService.getCachedClassroomList()
    const classroom = classroomList.find((elem: any) => elem.id === value)
    return classroom.name
  }

}
