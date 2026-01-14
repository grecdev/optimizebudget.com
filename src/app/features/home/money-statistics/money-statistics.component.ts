import { type AfterViewInit, type ElementRef, Component, OnInit, ViewChild } from '@angular/core';

import { type DataSourceItem, DataSourceItemKey } from './money-statistics.model';

@Component({
  selector: 'app-money-statistics',
  templateUrl: './money-statistics.component.html',
  styleUrls: ['./money-statistics.component.scss'],
})
export class MoneyStatisticsComponent implements OnInit, AfterViewInit {
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
   *     textSize: number;
   *   }}
   * @private
   */
  private readonly _canvasStyle: {
    width: number;
    height: number;
    spacing: number;
    textSize: number;
  } = {
    width: 800,
    height: 350,
    spacing: 16,
    textSize: 16,
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
    // {
    //   [DataSourceItemKey.ID]: 2,
    //   [DataSourceItemKey.NAME]: 'Monthly gym membership',
    //   [DataSourceItemKey.VALUE]: 45,
    //   [DataSourceItemKey.TIMESTAMP]: 1768137785012,
    // },
    // {
    //   [DataSourceItemKey.ID]: 3,
    //   [DataSourceItemKey.NAME]: 'Lamp',
    //   [DataSourceItemKey.VALUE]: 5,
    //   [DataSourceItemKey.TIMESTAMP]: 1768052221606,
    // },
    // {
    //   [DataSourceItemKey.ID]: 4,
    //   [DataSourceItemKey.NAME]: 'Electricity bill',
    //   [DataSourceItemKey.VALUE]: 90,
    //   [DataSourceItemKey.TIMESTAMP]: 1768224185012,
    // },
    // {
    //   [DataSourceItemKey.ID]: 5,
    //   [DataSourceItemKey.NAME]: 'Cinema tickets',
    //   [DataSourceItemKey.VALUE]: 25,
    //   [DataSourceItemKey.TIMESTAMP]: 1768310585012,
    // },
    // {
    //   [DataSourceItemKey.ID]: 6,
    //   [DataSourceItemKey.NAME]: 'Groceries',
    //   [DataSourceItemKey.VALUE]: 110,
    //   [DataSourceItemKey.TIMESTAMP]: 1768396985012,
    // },
    // {
    //   [DataSourceItemKey.ID]: 7,
    //   [DataSourceItemKey.NAME]: 'Taxi ride',
    //   [DataSourceItemKey.VALUE]: 18,
    //   [DataSourceItemKey.TIMESTAMP]: 1768483385012,
    // },
    // {
    //   [DataSourceItemKey.ID]: 8,
    //   [DataSourceItemKey.NAME]: 'Online course subscription',
    //   [DataSourceItemKey.VALUE]: 60,
    //   [DataSourceItemKey.TIMESTAMP]: 1768569785012,
    // },
    // {
    //   [DataSourceItemKey.ID]: 9,
    //   [DataSourceItemKey.NAME]: 'Coffee with friends',
    //   [DataSourceItemKey.VALUE]: 12,
    //   [DataSourceItemKey.TIMESTAMP]: 1768656185012,
    // },
    // {
    //   [DataSourceItemKey.ID]: 10,
    //   [DataSourceItemKey.NAME]: 'Book purchase',
    //   [DataSourceItemKey.VALUE]: 15,
    //   [DataSourceItemKey.TIMESTAMP]: 1768742585012,
    // },
  ];

  /**
   * @summary - Element reference to the HTML Canvas element.
   *
   * @type {ElementRef<HTMLCanvasElement> | null}
   * @public
   */
  @ViewChild('lineChart') public canvasElement: ElementRef<HTMLCanvasElement> | null = null;

  constructor(...args: Array<unknown>);
  constructor() {
    this._dataSource = this._dataSource.sort(
      (a, b) => a[DataSourceItemKey.VALUE] - b[DataSourceItemKey.VALUE]
    );
  }

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

    CANVAS_ELEMENT.style.width = `${this._canvasStyle.width}px`;
    CANVAS_ELEMENT.style.height = `${this._canvasStyle.height}px`;

    CANVAS_ELEMENT.width = this._canvasStyle.width * this._devicePixelRatio;
    CANVAS_ELEMENT.height = this._canvasStyle.height * this._devicePixelRatio;

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

    const formatNumber = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const RENDERING_AREA = CANVAS_ELEMENT.height - this._canvasStyle.spacing * 2;
    const MAXIMUM_ITEMS_TO_RENDER = 6;

    let currentDataSource = this._dataSource;

    if (currentDataSource.length > MAXIMUM_ITEMS_TO_RENDER) {
      currentDataSource = [
        ...this._dataSource.slice(0, MAXIMUM_ITEMS_TO_RENDER / 2),
        ...this._dataSource.slice(this._dataSource.length - MAXIMUM_ITEMS_TO_RENDER / 2),
      ];
    }

    // I am reversing the array here, because we need to start the rendering from the canvas's bottom position.
    const DATA_SOURCE_VALUES = currentDataSource
      .map(item => item[DataSourceItemKey.VALUE])
      .reverse();

    const DATA_LENGTH = DATA_SOURCE_VALUES.length;

    // Total spaces between element.
    const TOTAL_SPACES = DATA_LENGTH - 1;
    const GAP = RENDERING_AREA / TOTAL_SPACES;

    for (let i = 0; i < DATA_LENGTH; i++) {
      const ITEM = DATA_SOURCE_VALUES[i];
      const FORMATTED_ITEM = formatNumber.format(ITEM);

      const POSITION_Y = GAP * i + this._canvasStyle.spacing;

      this._canvasContext.beginPath();

      this._canvasContext.font = `${this._canvasStyle.textSize}px 'Roboto', sans-serif`;
      this._canvasContext.textAlign = 'left';
      this._canvasContext.textBaseline = 'middle';

      this._canvasContext.fillText(FORMATTED_ITEM, 0, Math.abs(POSITION_Y));

      this._canvasContext.closePath();
    }
  }

  ngOnInit() {
    const MINIMUM_ELEMENTS = 1;
    const NOT_ENOUGH_ELEMENTS = this._dataSource.length <= MINIMUM_ELEMENTS;

    if (NOT_ENOUGH_ELEMENTS) {
      throw Error('Canvas dataSource requires more elements!');
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
