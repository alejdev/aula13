import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, showPrefix?: boolean, splitPrefix?: boolean, split?: boolean): any {
    const prefixLength = value.length == 12 ? 3 : 2
    const prefixSplitter = splitPrefix ? ' ' : ''
    const splitter = split ? ' ' : ''
    return `${value.slice(showPrefix ? 0 : prefixLength, prefixLength)}${prefixSplitter}${value.slice(prefixLength, prefixLength + 3)}${splitter}${value.slice(prefixLength + 3, prefixLength + 6)}${splitter}${value.slice(prefixLength + 6)}`
  }
}
