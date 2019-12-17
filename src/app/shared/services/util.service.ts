import { Injectable } from '@angular/core'
import { AbstractControl } from '@angular/forms'

import { Sort, SortDirection } from '@angular/material/sort'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  // Regular expresions
  public static regExp: any = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^([+][0-9]{1,2})?[\s\-]?[0-9]{9,9}$/
  }

  // Sort array
  public static sortData(data: any, sort: Sort = { active: 'name', direction: 'asc' }, defaultSortDir: SortDirection = 'desc'): any {
    const properties = data && data[0] ? Object.keys(data[0]) : []
    return data.sort((a: any, b: any) => {
      const isAsc = sort.direction === defaultSortDir
      for (const p of properties) {
        if (sort.active === p) {
          return this.compare(a[p], b[p], isAsc)
        }
      }
      return 0
    })
  }

  // Compare datas
  public static compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
  }

  // Random number
  public static rand(max: number = 100, min: number = 0): number {
    return Math.floor(Math.random() * max) + min
  }

  // Password match validator
  public static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value
    const confirmPassword: string = control.get('confirmPassword').value
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ notSame: true })
    }
  }

  // Split a list by commas
  public static mark(list: any, index: number): string {
    switch (true) {
      case list.length === index + 1:
        return ``
      case list.length === index + 2:
        return `AND`
      default:
        return `,`
    }
  }

  // Generate resource path
  public static srcImage({ path, img, ext }: any = {}): string {
    return `${path ? path : 'assets/svgs/avatars/'}${img ? img : 'user-default'}${ext ? ext : '.svg'}`
  }

  // Compare if two object are equal by property
  public static equals(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2
  }
}
