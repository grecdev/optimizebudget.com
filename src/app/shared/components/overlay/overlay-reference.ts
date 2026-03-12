import { Subject } from 'rxjs';

import { type OverlayReferenceOptions } from './overlay.model';

/**
 * @summary - Individual overlay instance, used for behavioural intent.
 *
 * Letting the outer component know what is happening with the current rendered overlay.
 *
 * @public
 */
export class OverlayReference<C = unknown, CloseResult = unknown> {
  private readonly _closingOverlay = new Subject<OverlayReferenceOptions['currentID']>();
  private readonly _closingLastOverlay = new Subject<void>();
  private readonly _options: OverlayReferenceOptions;

  // So we don't leak our main Subject stream (observer)
  public readonly closingOverlay$ = this._closingOverlay.asObservable();
  public readonly closingLastOverlay$ = this._closingLastOverlay.asObservable();

  constructor(options: OverlayReferenceOptions) {
    this._options = options;
  }

  /**
   * @summary - Method called from outside the reference, usually when triggering a click event.
   *
   * @public
   * @returns {void}
   */
  public close(): void {
    this._closingOverlay.next(this._options.currentID);
  }

  /**
   * @summary - Method called from outside the reference, usually when triggering a document:keydown.escape event.
   */
  closeLastOverlay() {
    this._closingLastOverlay.next();
  }
}
