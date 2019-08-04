import { Injectable, Injector } from '@angular/core'

import { MatSnackBar, MatSnackBarConfig } from '@angular/material'
import { Overlay } from '@angular/cdk/overlay'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { BreakpointObserver } from '@angular/cdk/layout'

import { ToastComponent } from '../components/toast/toast.component'
import { User } from 'src/app/classroom/classroom.model'


@Injectable({
  providedIn: 'root'
})
export class ToastService extends MatSnackBar {

  constructor(
    overlay: Overlay,
    live: LiveAnnouncer,
    injector: Injector,
    breakpointObserver: BreakpointObserver,
    parentSnackBar: MatSnackBar,
    defaultConfig: MatSnackBarConfig
  ) {
    super(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig)
  }

  say(text: string, type?: string, config?: any): void {
    this.openFromComponent(
      ToastComponent,
      {
        data: {
          message: text,
          messageType: type,
        },
        ...config
      }
    )
  }

  info(text: string): void {
    this.say(text, 'info')
  }

  warning(text: string): void {
    this.say(text, 'warning')
  }

  error(text: string): void {
    this.say(text, 'error')
  }

  welcome(user: User, config?: any): void {
    this.openFromComponent(
      ToastComponent,
      {
        data: {
          messageType: 'welcome',
          message: 'MSG.WELCOME',
          name: user && user.name ? user.name : '😊'
        },
        ...config
      }
    )
  }

}
