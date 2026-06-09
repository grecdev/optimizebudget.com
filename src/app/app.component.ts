import {
  type AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-logged-in]': 'userIsLoggedIn',
  },
})
export class AppComponent implements AfterViewInit {
  /**
   * @summary - For testing purposes.
   */
  userIsLoggedIn: boolean = true;

  /**
   * @summary - Used to change layout.
   *
   * @type {number}
   *
   * @public
   */
  public appHeaderHeightPX: number = -1;

  @ViewChild('appHeader', {
    read: ElementRef<HTMLElement>,
  })
  private readonly _appHeader: ElementRef<HTMLElement> | null = null;

  /**
   * @summary - Set global variable to change layout's boxes positions.
   *
   * @private
   * @returns {void}
   */
  private _setHeaderHeight(): void {
    const NATIVE_ELEMENT = this._appHeader && this._appHeader.nativeElement;

    if (!NATIVE_ELEMENT) {
      return;
    }

    const HEIGHT = NATIVE_ELEMENT.getBoundingClientRect().height;

    this.appHeaderHeightPX = HEIGHT;
  }

  ngAfterViewInit(): void {
    this._setHeaderHeight();
  }
}
