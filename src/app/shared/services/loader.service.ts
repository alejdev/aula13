import { BehaviorSubject, Observable } from 'rxjs'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private initialCount: number = 0
  private countTracker$: BehaviorSubject<number> = new BehaviorSubject<number>(this.initialCount)
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  // Get number of asynchronous request
  getCount(): Observable<number> {
    return this.countTracker$.asObservable()
  }

  setCount(val: number, delta: number): void {
    this.countTracker$.next(val + delta)
  }

  increment(): void {
    this.setCount(this.countTracker$.value, 1)
  }

  decrement(): void {
    this.setCount(this.countTracker$.value, -1)
  }

  resetCount(): void {
    this.countTracker$.next(this.initialCount)
  }

  // Get satus of loader
  getStatus(): Observable<boolean> {
    return this.loading$.asObservable()
  }

  setStatus(inprogess: boolean) {
    this.loading$.next(inprogess)
  }

  // Load request
  load(): void {
    if (this.countTracker$.value === 0) {
      this.setStatus(true)
    }
    this.increment()
    console.log('++', this.countTracker$.value)
  }

  // Stop request
  down(): void {
    this.decrement()
    if (this.countTracker$.value === 0) {
      this.setStatus(false)
    }
    console.log('--', this.countTracker$.value)
  }
}
