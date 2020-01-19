import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'stripHTML'
})
export class StripHTMLPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    if (value) {
      return value.replace(/<[^>]*>?/gm, ' ')
    }
    return ''
  }

}
