import { Injectable } from '@angular/core'
import { Sort, SortDirection } from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  /** Regular expresions */
  public static regExp: any = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  /** Sort array */
  public static sortData(data: any, sort: Sort = { active: 'name', direction: 'asc' }, defaultSortDir: SortDirection = 'desc'): any {
    const properties = data ? Object.keys(data[0]) : []
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

  /** Compare datas */
  public static compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
  }

  /** Random number */
  public static rand(max: number = 100, min: number = 0): number {
    return Math.floor(Math.random() * max) + min
  }
}
