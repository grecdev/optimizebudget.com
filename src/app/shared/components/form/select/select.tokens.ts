import { InjectionToken } from '@angular/core';

/**
 * @summary - To be able to access the parent component from within its children.
 *
 * @type {InjectionToken<string>}
 *
 * @public
 */
const APP_SELECT_COMPONENT_REFERENCE: InjectionToken<string> = new InjectionToken<string>(
  'APP_SELECT_COMPONENT_REFERENCE'
);

export { APP_SELECT_COMPONENT_REFERENCE };
