import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'srcImage'
})
export class SrcImagePipe implements PipeTransform {

  transform(value: any, white: boolean): any {
    return `assets/svgs/avatars/${value ? value : `user-default${white ? '-white' : ''}`}.svg`
  }

}
