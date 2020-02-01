import { Pipe, PipeTransform } from '@angular/core'
import { SubjectService } from 'src/app/classroom/services/subject.service'

@Pipe({
  name: 'subjectName'
})
export class SubjectNamePipe implements PipeTransform {

  constructor(
    private subjectService: SubjectService
  ) { }

  transform(value: any, ...args: any[]): any {
    return this.subjectService
      .cachedSubjects
      .find((elem: any) => elem.id === value)
      .name
  }

}
