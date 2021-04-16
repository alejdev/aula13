import { SubjectService } from 'src/app/classroom/services/subject.service'
import { Subject } from 'src/app/core/interfaces'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'subjectName'
})
export class SubjectNamePipe implements PipeTransform {

  constructor(
    private subjectService: SubjectService
  ) { }

  transform(value: string, ...args: any[]): any {
    return this.subjectService
      .cachedSubjects
      .find((elem: Subject) => elem.id === value)
      .name
  }

}
