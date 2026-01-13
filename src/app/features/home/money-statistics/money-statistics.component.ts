import { type AfterViewInit, Component, type ElementRef, ViewChild } from '@angular/core';

import { type DataSourceItem, DataSourceItemKey } from './money-statistics.model';

@Component({
  selector: 'app-money-statistics',
  templateUrl: './money-statistics.component.html',
  styleUrls: ['./money-statistics.component.scss'],
})
export class MoneyStatisticsComponent implements AfterViewInit {
  /**
   * @summary - Get the pixel ratio for current device.
   *
   * In order to fix the blurry canvas.
   *
   * @type {number}
   * @private
   */
  private readonly _devicePixelRatio: number = window.devicePixelRatio || 1;

  /**
   * @summary - Canvas styling.
   *
   * Sizes are always in pixels.
   *
   * @type {{
   *     width: number;
   *     height: number;
   *     spacing: number;
   *   }}
   * @private
   */
  private readonly _canvasStyling: {
    width: number;
    height: number;
    spacing: number;
  } = {
    width: 800,
    height: 350,
    spacing: 16,
  };

  /**
   * @summary - 2D canvas context used throughout the component.
   *
   * @type {CanvasRenderingContext2D | null}
   *
   * @private
   */
  private _canvasContext: CanvasRenderingContext2D | null = null;

  /**
   * @summary - The data we want to render in our pie chart.
   *
   * @type {Array<CategoryExpenseItem>}
   * @private
   */
  private readonly _dataSource: Array<DataSourceItem> = [
    {
      [DataSourceItemKey.ID]: 0,
      [DataSourceItemKey.NAME]: 'Laptop for work',
      [DataSourceItemKey.VALUE]: 2000,
      [DataSourceItemKey.TIMESTAMP]: 1767853992492,
    },
    {
      [DataSourceItemKey.ID]: 1,
      [DataSourceItemKey.NAME]: '1kg Shaorma',
      [DataSourceItemKey.VALUE]: 20,
      [DataSourceItemKey.TIMESTAMP]: 1768051385012,
    },
    {
      [DataSourceItemKey.ID]: 3,
      [DataSourceItemKey.NAME]: 'Lamp',
      [DataSourceItemKey.VALUE]: 5,
      [DataSourceItemKey.TIMESTAMP]: 1768052221606,
    },
  ];

  /**
   * @summary - Element reference to the HTML Canvas element.
   *
   * @type {ElementRef<HTMLCanvasElement> | null}
   * @public
   */
  @ViewChild('lineChart') public canvasElement: ElementRef<HTMLCanvasElement> | null = null;

  /**
   * @summary - Render initial canvas element, with basic configuration.
   *
   * @private
   * @returns {void}
   */
  private _renderInitialCanvas(): void {
    const CANVAS_ELEMENT = this.canvasElement && this.canvasElement.nativeElement;

    if (!CANVAS_ELEMENT || !this._canvasContext) {
      throw Error('Canvas element not found!');
    }

    CANVAS_ELEMENT.style.width = `${this._canvasStyling.width}px`;
    CANVAS_ELEMENT.style.height = `${this._canvasStyling.height}px`;

    CANVAS_ELEMENT.width = Math.floor(this._canvasStyling.width * this._devicePixelRatio);
    CANVAS_ELEMENT.height = Math.floor(this._canvasStyling.height * this._devicePixelRatio);

    this._canvasContext.beginPath();
    this._canvasContext.rect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    this._canvasContext.stroke(); // Remove stroke when ready.

    this._canvasContext.closePath();
  }

  /**
   * @summary - Render dataSource values on the Y axis.
   *
   * @private
   * @returns {void}
   */
  private _renderValues(): void {
    const CANVAS_ELEMENT = this.canvasElement && this.canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    let positionY = CANVAS_ELEMENT.height - this._canvasStyling.spacing;

    const MARGIN_PX = 16;
    const DATA_SOURCE_VALUES = this._dataSource
      .map(item => item[DataSourceItemKey.VALUE])
      .sort((a, b) => a - b);

    for (let i = 0; i < DATA_SOURCE_VALUES.length; i++) {
      const ITEM = DATA_SOURCE_VALUES[i].toString();

      this._canvasContext.beginPath();
      this._canvasContext.font = "0.9rem 'Roboto', sans-serif";
      this._canvasContext.fillText(ITEM, this._canvasStyling.spacing, positionY);
      this._canvasContext.closePath();

      positionY -= this._canvasStyling.spacing + MARGIN_PX;
    }
  }

  ngAfterViewInit() {
    const CANVAS_ELEMENT = this.canvasElement && this.canvasElement.nativeElement;
    const CANVAS_CONTEXT = CANVAS_ELEMENT && CANVAS_ELEMENT.getContext('2d');

    if (!CANVAS_ELEMENT || !CANVAS_CONTEXT) {
      throw Error('Canvas element not queried!');
    }

    this._canvasContext = CANVAS_CONTEXT;

    this._renderInitialCanvas();
    this._renderValues();
  }
}
