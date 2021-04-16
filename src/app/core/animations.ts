import { animate, group, query, state, style, transition, trigger } from '@angular/animations'

export const ANIMATE_FLOATING_BUTTON = trigger('animateFloatingButton', [
  state('leave',
    style({
      transform: 'rotate(0deg)'
    })
  ),
  state('enter',
    style({
      transform: 'rotate(180deg)',
    })
  ),
  transition('* => *', animate('180ms ease-in'))
])

export const INDICATOR_ROTATE = trigger('indicatorRotate', [
  state('collapsed', style({ transform: 'rotate(0deg)' })),
  state('expanded', style({ transform: 'rotate(90deg)' })),
  transition('expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
  ),
])

export const OPACITY = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 }), { optional: true }),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 }), { optional: true }),
  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 0 })), // y: '-100%'
    ]), { optional: true }),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 1 })),
    ]), { optional: true })
  ])
]

export const SLIDE_LEFT = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1, transform: 'translate3d(0%,0,0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0, transform: 'translate3d(-100%,0,0)' }), { optional: true }),
  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 0, transform: 'translate3d(100%,0,0)' })), // y: '-100%'
    ]), { optional: true }),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'translate3d(0%,0,0)' })),
    ]), { optional: true })
  ])
]

export const SLIDE_RIGHT = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1, transform: 'translate3d(0%,0,0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0, transform: 'translate3d(100%,0,0)' }), { optional: true }),

  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 0, transform: 'translate3d(-100%,0,0)' })), // y: '-100%'
    ]), { optional: true }),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'translate3d(0%,0,0)' })),
    ]), { optional: true })
  ])
]
