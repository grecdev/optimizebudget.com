import { type AfterViewInit, Component, type ElementRef, OnInit, ViewChild } from '@angular/core';

import { DEFAULT_TICKS, generateNiceNumbersArray } from '@script/nice-numbers';

import {
  DataSourceItemKey,
  type DataSourceOptions,
  type GraphConfiguration,
} from './money-statistics.model';

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
   *     textSize: number;
   *     font: string;
   *   }}
   * @private
   */
  private readonly _canvasStyle: {
    width: number;
    height: number;
    spacing: number;
    fontSize: number;
    font: string;
  } = {
    width: 800,
    height: 350,
    spacing: 16,
    fontSize: 16,
    font: "1rem 'Roboto', sans-serif",
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
   * @summary - The data we want to render in our line chart.
   *
   * @type {DataSourceOptions}
   * @private
   */
  private readonly _dataSource: DataSourceOptions = {
    xAxis: {
      data: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    series: [
      {
        [DataSourceItemKey.ID]: 0,
        [DataSourceItemKey.NAME]: 'Laptop for work',
        [DataSourceItemKey.VALUE]: [150],
      },
      {
        [DataSourceItemKey.ID]: 1,
        [DataSourceItemKey.NAME]: '1kg Shaorma',
        [DataSourceItemKey.VALUE]: [230],
      },
      {
        [DataSourceItemKey.ID]: 2,
        [DataSourceItemKey.NAME]: 'Monthly gym membership',
        [DataSourceItemKey.VALUE]: [224],
      },
      {
        [DataSourceItemKey.ID]: 3,
        [DataSourceItemKey.NAME]: 'Lamp',
        [DataSourceItemKey.VALUE]: [218],
      },
      {
        [DataSourceItemKey.ID]: 4,
        [DataSourceItemKey.NAME]: 'Electricity bill',
        [DataSourceItemKey.VALUE]: [135],
      },
      {
        [DataSourceItemKey.ID]: 5,
        [DataSourceItemKey.NAME]: 'Cinema tickets',
        [DataSourceItemKey.VALUE]: [147],
      },
      {
        [DataSourceItemKey.ID]: 6,
        [DataSourceItemKey.NAME]: 'Groceries',
        [DataSourceItemKey.VALUE]: [260],
      },
      {
        [DataSourceItemKey.ID]: 7,
        [DataSourceItemKey.NAME]: 'Taxi ride',
        [DataSourceItemKey.VALUE]: [250],
      },
      {
        [DataSourceItemKey.ID]: 8,
        [DataSourceItemKey.NAME]: 'Online course subscription',
        [DataSourceItemKey.VALUE]: [100],
      },
      {
        [DataSourceItemKey.ID]: 9,
        [DataSourceItemKey.NAME]: 'Coffee with friends',
        [DataSourceItemKey.VALUE]: [50],
      },
      {
        [DataSourceItemKey.ID]: 10,
        [DataSourceItemKey.NAME]: 'Book purchase',
        [DataSourceItemKey.VALUE]: [1],
      },
      {
        [DataSourceItemKey.ID]: 11,
        [DataSourceItemKey.NAME]: 'Streaming subscription',
        [DataSourceItemKey.VALUE]: [25],
      },
      {
        [DataSourceItemKey.ID]: 12,
        [DataSourceItemKey.NAME]: 'Mobile app purchase',
        [DataSourceItemKey.VALUE]: [15],
      },
      {
        [DataSourceItemKey.ID]: 13,
        [DataSourceItemKey.NAME]: 'Snack',
        [DataSourceItemKey.VALUE]: [5],
      },
      {
        [DataSourceItemKey.ID]: 14,
        [DataSourceItemKey.NAME]: 'Plastic bag',
        [DataSourceItemKey.VALUE]: [1],
      },
    ],
  };

  /**
   * @summary - Get the starting position X based on label text width.
   *
   * @type {number}
   *
   * @private
   */
  private _startingPositionX: number = 0;

  /**
   * @summary - Element reference to the HTML Canvas element.
   *
   * @type {ElementRef<HTMLCanvasElement> | null}
   * @public
   */
  @ViewChild('lineChart') public canvasElement: ElementRef<HTMLCanvasElement> | null = null;

  constructor(...args: Array<unknown>);
  constructor() {}

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

    this._canvasContext.clearRect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);

    this._canvasContext.beginPath();
    this._canvasContext.fillStyle = '#fff';
    this._canvasContext.fillRect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    this._canvasContext.rect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    this._canvasContext.closePath();
  }

  /**
   * @summary - Render dataSource values on the Y axis.
   *
   * Basically render an "invisible" text outside our canvas element, to get the width of the rendered pixels.
   * And only after then, we add another set of text, which is visible in the canvas, with correct positions.
   *
   * @private
   * @returns {void}
   */
  private _renderLegendY(): void {
    const CANVAS_ELEMENT = this.canvasElement && this.canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const graphConfiguration = this._getGraphConfiguration();

    const { MAXIMUM_VALUE, RENDERING_AREA_Y } = graphConfiguration;

    let niceNumberValues = generateNiceNumbersArray(0, MAXIMUM_VALUE);

    if (niceNumberValues.length > DEFAULT_TICKS) {
      niceNumberValues = generateNiceNumbersArray(0, MAXIMUM_VALUE, DEFAULT_TICKS / 2);
    }

    // I am reversing the array here, because we need to start the rendering from the canvas's bottom position.
    niceNumberValues.reverse();

    const formatNumber = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const DATA_LENGTH = niceNumberValues.length;

    const TEXT_SIZES = [];
    const ROW_WIDTH = RENDERING_AREA_Y / (DATA_LENGTH - 1);

    // Invisible text
    for (let i = 0; i < DATA_LENGTH; i++) {
      const ITEM = niceNumberValues[i];
      const FORMATTED_ITEM = formatNumber.format(ITEM);

      this._canvasContext.font = this._canvasStyle.font;
      this._canvasContext.fillText(FORMATTED_ITEM, -999, -999);

      const ITEM_WIDTH_AFTER_RENDER = this._canvasContext.measureText(FORMATTED_ITEM).width;

      TEXT_SIZES.push(ITEM_WIDTH_AFTER_RENDER);
    }

    this._startingPositionX = Math.max(...TEXT_SIZES);

    // Visible text
    for (let i = 0; i < DATA_LENGTH; i++) {
      const ITEM = niceNumberValues[i];
      const FORMATTED_ITEM = formatNumber.format(ITEM);
      const POSITION_Y = ROW_WIDTH * i + this._canvasStyle.spacing;

      this._canvasContext.font = this._canvasStyle.font;
      this._canvasContext.fillStyle = '#000';
      this._canvasContext.textAlign = 'right';
      this._canvasContext.textBaseline = 'middle';
      this._canvasContext.fillText(FORMATTED_ITEM, this._startingPositionX, Math.abs(POSITION_Y));
    }

    this._renderBackgroundLines(DATA_LENGTH, ROW_WIDTH, CANVAS_ELEMENT.width);
  }

  /**
   * @summary - Dynamically render legend values on x-axis.
   *
   * Calculate the total labels to render on canvas,
   * based on the render area's width and the maximum label's width.
   *
   * @private
   * @returns {void}
   */
  private _renderLegendX(): void {
    const CANVAS_ELEMENT = this.canvasElement && this.canvasElement.nativeElement;

    const canvasContext = this._canvasContext;

    if (!canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const graphConfiguration = this._getGraphConfiguration();

    const { DATA_SOURCE, PADDING_X, RENDERING_AREA_X, DATA_LENGTH, AREA_Y_WIDTH, COLUMN_WIDTH } =
      graphConfiguration;

    const TEXT_SIZES: Array<number> = DATA_SOURCE.map(
      item => canvasContext.measureText(item).width + PADDING_X
    );

    const MAXIMUM_TEXT_SIZE = Math.max(...TEXT_SIZES.map(item => item));
    const MAX_LABELS = Math.floor(RENDERING_AREA_X / MAXIMUM_TEXT_SIZE);
    const STEP = Math.ceil(DATA_LENGTH / MAX_LABELS);

    for (let i = 0; i < DATA_SOURCE.length; i++) {
      const ITEM = DATA_SOURCE[i];
      const POSITION_X = AREA_Y_WIDTH + i * COLUMN_WIDTH + COLUMN_WIDTH / 2;

      canvasContext.font = this._canvasStyle.font;
      canvasContext.fillStyle = '#000';
      canvasContext.textAlign = 'center';
      canvasContext.textBaseline = 'bottom';

      canvasContext.fillText(ITEM, i % STEP === 0 ? POSITION_X : -999, CANVAS_ELEMENT.height);
    }
  }

  /**
   * @summary - Render lines that are aligned with the legend on y-axis.
   *
   * @param {number} dataLength - Total items rendered
   * @param {number} rowWidth - Row width between ticks
   * @param {number} canvasWidth - Canvas element width
   *
   * @private
   * @returns {void}
   */
  private _renderBackgroundLines(dataLength: number, rowWidth: number, canvasWidth: number): void {
    if (!this._canvasContext) {
      throw Error('Canvas context not found!');
    }

    for (let i = 0; i < dataLength; i++) {
      const POSITION_Y = rowWidth * i + this._canvasStyle.spacing;

      this._canvasContext.beginPath();

      this._canvasContext.moveTo(this._startingPositionX + this._canvasStyle.spacing, POSITION_Y);
      this._canvasContext.lineTo(canvasWidth, POSITION_Y);
      this._canvasContext.strokeStyle = '#c9c9c9';
      this._canvasContext.lineWidth = 1;
      this._canvasContext.stroke();

      this._canvasContext.closePath();
    }
  }

  /**
   * @summary - Render dots and lines according to X, Y coordinates and data.
   *
   * Needs to be aligned with the X and Y legends.
   *
   * @private
   * @returns {void}
   */
  private _renderDataGraph(): void {
    if (!this._canvasContext) {
      throw Error('Canvas context not found!');
    }

    const graphConfiguration = this._getGraphConfiguration();

    const {
      ARC_RADIUS,
      DATA_LENGTH,
      ALL_VALUES,
      MAXIMUM_VALUE,
      FULL_PERCENT,
      AREA_Y_WIDTH,
      COLUMN_WIDTH,
      RENDERING_AREA_Y,
      START_ANGLE,
      END_ANGLE,
    } = graphConfiguration;

    this._canvasContext.strokeStyle = '#008000';
    this._canvasContext.lineWidth = ARC_RADIUS / 2;

    for (let i = 0; i < DATA_LENGTH; i++) {
      const CURRENT_VALUE = ALL_VALUES[i];
      const CURRENT_PERCENT = (CURRENT_VALUE / MAXIMUM_VALUE) * FULL_PERCENT;

      const CURRENT_POSITION_X = AREA_Y_WIDTH + i * COLUMN_WIDTH + COLUMN_WIDTH / 2;
      const CURRENT_POSITION_Y =
        RENDERING_AREA_Y -
        (CURRENT_PERCENT / FULL_PERCENT) * RENDERING_AREA_Y +
        this._canvasStyle.fontSize;

      // lines
      const NEXT_VALUE = ALL_VALUES[i + 1];
      const NEXT_PERCENT = (NEXT_VALUE / MAXIMUM_VALUE) * FULL_PERCENT;
      const NEXT_POSITION_X = AREA_Y_WIDTH + (i + 1) * COLUMN_WIDTH + COLUMN_WIDTH / 2;

      const NEXT_POSITION_Y =
        RENDERING_AREA_Y -
        (NEXT_PERCENT / FULL_PERCENT) * RENDERING_AREA_Y +
        this._canvasStyle.fontSize;

      this._canvasContext.beginPath();

      this._canvasContext.moveTo(CURRENT_POSITION_X, CURRENT_POSITION_Y);
      this._canvasContext.lineTo(NEXT_POSITION_X, NEXT_POSITION_Y);
      this._canvasContext.stroke();

      this._canvasContext.closePath();

      // Dots
      this._canvasContext.beginPath();

      this._canvasContext.arc(
        CURRENT_POSITION_X,
        CURRENT_POSITION_Y,
        ARC_RADIUS,
        START_ANGLE,
        END_ANGLE
      );

      this._canvasContext.fillStyle = '#fff';
      this._canvasContext.fill();
      this._canvasContext.stroke();

      this._canvasContext.closePath();
    }
  }

  /**
   * @summary - Get all configurations needed to render data on our graph.
   *
   * Widths, spacing, steps, positions etc.
   *
   * @private
   * @returns {GraphConfiguration}
   */
  private _getGraphConfiguration(): GraphConfiguration {
    const CANVAS_ELEMENT = this.canvasElement && this.canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const DATA_SOURCE = this._dataSource.xAxis.data;
    const ALL_VALUES = this._dataSource.series.map(item => item[DataSourceItemKey.VALUE]).flat();
    const DATA_LENGTH = ALL_VALUES.length;
    const MAXIMUM_VALUE = Math.max(...ALL_VALUES);

    const AREA_Y_WIDTH = this._startingPositionX + this._canvasStyle.spacing;
    const RENDERING_AREA_X = CANVAS_ELEMENT.width - AREA_Y_WIDTH;
    const COLUMN_WIDTH = RENDERING_AREA_X / DATA_SOURCE.length;
    const RENDERING_AREA_Y =
      CANVAS_ELEMENT.height - this._canvasStyle.spacing * 2 - this._canvasStyle.fontSize;
    const PADDING_X = this._canvasStyle.spacing * 2;

    const FULL_PERCENT = 100;
    const ARC_RADIUS = 4.5;
    const START_ANGLE = 0;
    const END_ANGLE = Math.PI * 2; // 360° means a complete circle

    return {
      DATA_SOURCE,
      ALL_VALUES,
      DATA_LENGTH,
      MAXIMUM_VALUE,

      RENDERING_AREA_X,
      RENDERING_AREA_Y,
      AREA_Y_WIDTH,
      COLUMN_WIDTH,
      PADDING_X,

      FULL_PERCENT,
      ARC_RADIUS,
      START_ANGLE,
      END_ANGLE,
    };
  }

  ngAfterViewInit() {
    const CANVAS_ELEMENT = this.canvasElement && this.canvasElement.nativeElement;
    const CANVAS_CONTEXT = CANVAS_ELEMENT && CANVAS_ELEMENT.getContext('2d', { alpha: false });

    if (!CANVAS_ELEMENT || !CANVAS_CONTEXT) {
      throw Error('Canvas element not queried!');
    }

    this._canvasContext = CANVAS_CONTEXT;

    this._renderInitialCanvas();
    this._renderLegendY();
    this._renderLegendX();
    this._renderDataGraph();
  }
}
