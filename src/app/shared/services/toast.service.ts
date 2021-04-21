import { LiveAnnouncer } from '@angular/cdk/a11y'
import { BreakpointObserver } from '@angular/cdk/layout'
import { Overlay } from '@angular/cdk/overlay'
import { Injectable, Injector } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material'

import { ToastComponent } from '../components/toast/toast.component'

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

  say(data: any, config?: MatSnackBarConfig): void {
    this.openFromComponent(
      ToastComponent,
      {
        data: {
          type: 'info',
          text: 'MSG.WELCOME',
          icon: data.type === 'success' ? 'check' : data.type === 'warning' ? 'exclamation' : data.type === 'error' ? 'skull-crossbones' : 'info',
          ...data
        },
        ...config
      }
    )
  }

  success(data: any, config?: MatSnackBarConfig): void {
    this.say({ type: 'success', ...data }, config)
  }

  info(data: any, config?: MatSnackBarConfig): void {
    this.say({ type: 'info', ...data }, config)
  }

  warning(data: any, config?: MatSnackBarConfig): void {
    this.say({ type: 'warning', ...data }, config)
  }

  error(data: any, config?: MatSnackBarConfig): void {
    this.say({ type: 'error', ...data }, config)
  }

  welcome(data: any, config?: MatSnackBarConfig): void {
    this.openFromComponent(
      ToastComponent,
      {
        data: {
          type: 'welcome',
          text: 'MSG.WELCOME',
          icon: 'info',
          name: data.user && data.user.name ? data.user.name : '😊',
          ...data
        },
        ...config
      }
    )
  }

}
