import { animate, state, style, transition, trigger } from '@angular/animations';

const containerAnimation = trigger('containerAnimation', [
  state(
    'enter',
    style({
      transform: 'translateX(0)',
    })
  ),
  state(
    'exit',
    style({
      transform: 'translateX(-100%)',
    })
  ),
  transition('enter <=> exit', [animate('150ms ease-in-out')]),
]);

export { containerAnimation };
