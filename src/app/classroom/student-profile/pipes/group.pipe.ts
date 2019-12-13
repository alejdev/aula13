import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {

  transform(value: any, list?: any): string {
    return list.find((group: any) => {
      return group.group.find((subGroup: any) => subGroup.id === value)
    }).name
  }
}
