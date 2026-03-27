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
  private readonly _completeObservable = new Subject<void>();

  // So we don't leak our main Subject stream (observer)
  public readonly closingOverlay$ = this._closingOverlay.asObservable();
  public readonly completeObservable$ = this._completeObservable.asObservable();

  /**
   * @summary - Method called from outside the reference, on certain events.
   *
   * @public
   * @returns {void}
   */
  public close(): void {
    this._closingOverlay.next();
  }

  /**
   * @summary - If we don't have any overlays rendered, just end the stream.
   *
   * In combination with `takeUntil()` operator.
   *
   * @public
   * @returns {void}
   */
  public complete(): void {
    this._completeObservable.next();
    this._completeObservable.complete();
  }
}
