import { ANIMATE_FLOATING_BUTTON } from 'src/app/core/animations'

import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'a13-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  animations: [ANIMATE_FLOATING_BUTTON]
})
export class FloatingButtonComponent implements OnInit {

  @Input() text: string
  @Input() tooltip: string
  @Input() icon: string
  @Input() action: any
  @Input() route: any
  @Input() disabled: boolean
  @Input() rotate: boolean
  @Input() pulse: boolean

  // buttonState: any
  // @HostListener('mouseenter') onMouseEnter(): void { this.buttonState = this.rotate ? 'enter' : false }
  // @HostListener('mouseleave') onMouseLeave(): void { this.buttonState = this.rotate ? 'leave' : false }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.buttonState = 'leave'
  }

  toAction(): void {
    if (!this.disabled) {
      if (this.action) {
        this.action()
      }
      if (this.route) {
        this.router.navigate([this.route])
      }
    }
  }
}
