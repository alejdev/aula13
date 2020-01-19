import { trigger, state, style, transition, animate } from '@angular/animations'

export const animateFloatingButton = trigger('animateFloatingButton', [
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

export const indicatorRotate = trigger('indicatorRotate', [
	state('collapsed', style({ transform: 'rotate(0deg)' })),
	state('expanded', style({ transform: 'rotate(90deg)' })),
	transition('expanded <=> collapsed',
		animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
	),
])
