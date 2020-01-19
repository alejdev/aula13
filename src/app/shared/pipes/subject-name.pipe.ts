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
    const subjectList = this.subjectService.getCachedSubjectList()
    const subject = subjectList.find((elem: any) => elem.id === value)
    return subject.name
  }

}
