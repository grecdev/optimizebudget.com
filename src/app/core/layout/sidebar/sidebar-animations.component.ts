import { animate, style, transition, trigger } from '@angular/animations';

const TRANSITION_DURATION_MS = 350;
const TRANSITION = `${TRANSITION_DURATION_MS}ms ease-in-out`;

const ENTER_STYLE = {
  transform: 'translateX(0)',
};

const EXIT_STYLE = {
  transform: 'translateX(-100%)',
};

const containerAnimation = trigger('containerAnimation', [
  transition(':enter', [style(EXIT_STYLE), animate(TRANSITION, style(ENTER_STYLE))]),
  transition(':leave', [style(ENTER_STYLE), animate(TRANSITION, style(EXIT_STYLE))]),
]);

export { containerAnimation, TRANSITION_DURATION_MS };
