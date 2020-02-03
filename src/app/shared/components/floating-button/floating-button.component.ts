import { Component, OnInit, HostListener, Input } from '@angular/core'
import { Router } from '@angular/router'

import { animateFloatingButton } from 'src/app/classroom/classroom.animation'

@Component({
  selector: 'a13-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  animations: [animateFloatingButton]
})
export class FloatingButtonComponent implements OnInit {

  @Input() text: string
  @Input() icon: string
  @Input() action: any
  @Input() route: any
  @Input() disabled: boolean
  @Input() animate: boolean

  buttonState: any
  @HostListener('mouseenter') onMouseEnter(): void { this.buttonState = this.animate ? 'enter' : false }
  @HostListener('mouseleave') onMouseLeave(): void { this.buttonState = this.animate ? 'leave' : false }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buttonState = 'leave'
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
