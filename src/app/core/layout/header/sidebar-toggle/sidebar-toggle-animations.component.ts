import { animate, state, style, transition, trigger } from '@angular/animations';

const ANIMATE_STYLING = '150ms ease-in-out';
// Sync with SCSS.
const BUTTON_HEIGHT_PX = 20;
const BUTTON_CENTRAL_POINT_PX = BUTTON_HEIGHT_PX / 2;

const topBarAnimation = trigger('topBarAnimation', [
  state(
    'closed',
    style({
      transform: `translateY(-${BUTTON_CENTRAL_POINT_PX}px)`,
    })
  ),
  state(
    'open',
    style({
      transform: 'translateY(-50%) rotate(45deg)',
    })
  ),
  transition('closed <=> open', [animate(ANIMATE_STYLING)]),
]);

const middleBarAnimation = trigger('middleBarAnimation', [
  state(
    'closed',
    style({
      transform: 'translateY(-50%)',
    })
  ),
  state(
    'open',
    style({
      transform: 'translateY(-50%) scaleX(0)',
    })
  ),
  transition('closed <=> open', [animate(ANIMATE_STYLING)]),
]);

const bottomBarAnimation = trigger('bottomBarAnimation', [
  state(
    'closed',
    style({
      transform: `translateY(${BUTTON_CENTRAL_POINT_PX}px)`,
    })
  ),
  state(
    'open',
    style({
      transform: 'translateY(-50%) rotate(-45deg)',
    })
  ),
  transition('closed <=> open', [animate(ANIMATE_STYLING)]),
]);

export { topBarAnimation, middleBarAnimation, bottomBarAnimation };
