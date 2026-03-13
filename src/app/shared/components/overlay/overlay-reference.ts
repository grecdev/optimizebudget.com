import { Subject } from 'rxjs';

/**
 * @summary - Individual overlay instance, used for behavioural intent.
 *
 * Letting the outer component know what is happening with the current rendered overlay.
 *
 * @public
 */
export class OverlayReference<C = unknown, CloseResult = unknown> {
  private readonly _closingOverlay = new Subject<void>();

  // So we don't leak our main Subject stream (observer)
  public readonly closingOverlay$ = this._closingOverlay.asObservable();

  /**
   * @summary - Method called from outside the reference, usually when triggering a click event.
   *
   * @public
   * @returns {void}
   */
  public close(): void {
    this._closingOverlay.next();
  }
}
