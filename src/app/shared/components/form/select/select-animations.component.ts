import { animate, state, style, transition, trigger } from '@angular/animations';

const iconAnimation = trigger('rotateAnimation', [
  state(
    'initial',
    style({
      transform: 'rotate(0deg)',
    })
  ),
  state(
    'focused',
    style({
      transform: 'rotate(180deg)',
    })
  ),
  transition('initial <=> focused', [animate('150ms ease-in-out')]),
]);

export { iconAnimation };
