import { trigger, state, style, transition, animate } from '@angular/animations';


export const onSideNavChange = trigger('onSideNavChange', [
	state('close',
		style({
			'min-width': '{{widthClose}}'
		}),
		{ params: { widthClose: '60px' } }
	),
	state('open',
		style({
			'min-width': '{{widthOpen}}'
		}),
		{ params: { widthOpen: '220px' } }
	),
	transition('close => open', animate('180ms ease-in')),
	transition('open => close', animate('180ms ease-in')),
]);

export const onMainContentChange = trigger('onMainContentChange', [
	state('close',
		style({
			'margin-left': '{{leftClose}}'
		}),
		{ params: { leftClose: '60px' } }
	),
	state('open',
		style({
			'margin-left': '{{leftOpen}}'
		}),
		{ params: { leftOpen: '220px' } }
	),
	transition('close => open', animate('180ms ease-in')),
	transition('open => close', animate('180ms ease-in')),
]);

export const animateText = trigger('animateText', [
	state('hide',
		style({
			'display': 'none',
			opacity: 0,
		})
	),
	state('show',
		style({
			'display': 'block',
			opacity: 1,
		})
	),
	transition('close => open', animate('270ms ease-in')),
	transition('open => close', animate('180ms ease-out')),
]);

export const animateAvatar = trigger('animateAvatar', [
	state('small',
		style({
			'width': '32px',
			'height': '32px',
			'padding': '.2em'
		})
	),
	state('huge',
		style({
			'width': '64px',
			'height': '64px',
			'padding': '.5em'
		})
	),
	transition('close => open', animate('270ms ease-in')),
	transition('open => close', animate('180ms ease-out')),
]);