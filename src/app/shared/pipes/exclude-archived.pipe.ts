import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'excludeArchived'
})
export class ExcludeArchivedPipe implements PipeTransform {

  transform(array: any[], showArchived: boolean): any {
    if (!array || showArchived) { return array }

    return array.filter((elem) => !elem.student.archived)
  }

}
