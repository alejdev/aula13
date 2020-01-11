import { trigger, state, style, transition, animate } from '@angular/animations'

export const onSideNavChange = trigger('onSideNavChange', [
	state('close',
		style({
			minWidth: '{{widthClose}}'
		}),
		{ params: { widthClose: '60px' } }
	),
	state('open',
		style({
			minWidth: '{{widthOpen}}'
		}),
		{ params: { widthOpen: '220px' } }
	),
	transition('close => open', animate('180ms ease-in')),
	transition('open => close', animate('180ms ease-in')),
])

export const onMainContentChange = trigger('onMainContentChange', [
	state('close',
		style({
			marginLeft: '{{leftClose}}'
		}),
		{ params: { leftClose: '60px' } }
	),
	state('open',
		style({
			marginLeft: '{{leftOpen}}'
		}),
		{ params: { leftOpen: '220px' } }
	),
	transition('close => open', animate('180ms ease-in')),
	transition('open => close', animate('180ms ease-in')),
])

export const animateText = trigger('animateText', [
	state('hide',
		style({
			display: 'none',
			opacity: 0,
		})
	),
	state('show',
		style({
			display: 'block',
			opacity: 1,
		})
	),
	transition('close => open', animate('270ms ease-in')),
	transition('open => close', animate('180ms ease-out')),
])

export const animateAvatar = trigger('animateAvatar', [
	state('small',
		style({
			width: '32px',
			height: '32px',
			padding: '.2em'
		})
	),
	state('huge',
		style({
			width: '64px',
			height: '64px',
			padding: '8px'
		})
	),
	transition('close => open', animate('270ms ease-in')),
	transition('open => close', animate('180ms ease-out')),
])

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
