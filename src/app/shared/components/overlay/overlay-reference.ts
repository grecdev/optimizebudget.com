import { Subject } from 'rxjs';

import { type OverlayReferenceConstructorOptions } from './overlay.model';

/**
 * @summary - Individual overlay instance, used for behavioral intent.
 *
 * Letting the outer component know what is happening with the current rendered overlay.
 *
 * @public
 */
export class OverlayReference<C = unknown, CloseResult = unknown> {
  /**
   * @summary Disable global escape event for certain overlays.
   *
   * @type {boolean}
   *
   * @public
   */
  public disableEscapeEvent: boolean = false;

  /**
   * @summary - To remove the exact overlay reference from our overlay data source.
   *
   * @type {number}
   *
   * @public
   */
  public id: number = -1;

  private readonly _closingOverlay = new Subject<number>();
  private readonly _completeObservable = new Subject<void>();

  // So we don't leak our main Subject stream (observer)
  public readonly closingOverlay$ = this._closingOverlay.asObservable();
  public readonly completeObservable$ = this._completeObservable.asObservable();
  public readonly overlayElement: OverlayReferenceConstructorOptions['overlayElement'] = null;

  constructor(options: OverlayReferenceConstructorOptions) {
    this.overlayElement = options.overlayElement;
    this.disableEscapeEvent = options.disableEscapeEvent;
    this.id = options.id;
  }

  /**
   * @summary - Method called from outside the reference, on certain events.
   *
   * @public
   * @returns {void}
   */
  public close(id: number = this.id): void {
    this._closingOverlay.next(id);
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
