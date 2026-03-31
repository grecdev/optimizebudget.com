import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { CategoryType } from '@shared/models/enums';
import { DEFAULT_TICKS, generateNiceNumbersArray } from '@script/nice-numbers';

import {
  DataSourceItemKey,
  type DataSourceOptions,
  type GraphConfiguration,
} from './total-count-category.model';

@Component({
  selector: 'app-total-count-category',
  templateUrl: './total-count-category.component.html',
  styleUrls: ['./total-count-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalCountCategoryComponent implements AfterViewInit {
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
  private _dataSource: DataSourceOptions = {
    xAxis: {
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    },
    series: [
      {
        [DataSourceItemKey.ID]: 0,
        [DataSourceItemKey.NAME]: CategoryType.FOOD,
        [DataSourceItemKey.VALUE]: [12, 0, 0, 0],
      },
      {
        [DataSourceItemKey.ID]: 1,
        [DataSourceItemKey.NAME]: CategoryType.GADGETS,
        [DataSourceItemKey.VALUE]: [34, 0, 0, 0],
      },
      {
        [DataSourceItemKey.ID]: 2,
        [DataSourceItemKey.NAME]: CategoryType.CLOTHING,
        [DataSourceItemKey.VALUE]: [56, 0, 0, 0],
      },
      {
        [DataSourceItemKey.ID]: 3,
        [DataSourceItemKey.NAME]: CategoryType.HOME,
        [DataSourceItemKey.VALUE]: [78, 123, 0, 0],
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
   * @summary - Count of all expenses.
   *
   * @type number
   *
   * @public
   */
  public totalExpensesCount: number = 0;

  /**
   * @summary - Element reference to the HTML Canvas element.
   *
   * @type {ElementRef<HTMLCanvasElement> | null}
   * @private
   */
  @ViewChild('barChart') private _canvasElement: ElementRef<HTMLCanvasElement> | null =
    null;

  /**
   * @summary - A count of all expenses from data.
   *
   * @public
   * @returns {void}
   */
  // public calculateTotalExpenses(): void {
  //   this.totalExpensesCount = this.totalExpensesData
  //     .map(item => item.count)
  //     .reduce((total, currentIteration) => total + currentIteration, 0);
  // }

  /**
   * @summary - Get all configurations needed to render data on our graph.
   *
   * Widths, spacing, steps, positions etc.
   *
   * @private
   * @returns {GraphConfiguration}
   */
  private _getGraphConfiguration(): GraphConfiguration {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const X_AXIS_DATA = this._dataSource.xAxis.data;

    const LAST_ITEM = X_AXIS_DATA[X_AXIS_DATA.length - 1];
    const LAST_ITEM_MEASURE = this._canvasContext.measureText(LAST_ITEM);

    const ALL_SERIES_DATA_SOURCE = this._dataSource.series
      .map(item => item[DataSourceItemKey.VALUE])
      .flat();

    const DATA_SOURCE_SERIES_LENGTH = ALL_SERIES_DATA_SOURCE.length;
    const MAXIMUM_VALUE = Math.max(...ALL_SERIES_DATA_SOURCE);

    const AREA_Y_WIDTH = this._startingPositionX + this._canvasStyle.spacing;

    const RENDERING_AREA_X =
      CANVAS_ELEMENT.width - AREA_Y_WIDTH - LAST_ITEM_MEASURE.width / 2;

    const COLUMN_WIDTH_X = RENDERING_AREA_X / (X_AXIS_DATA.length - 1);

    const RENDERING_AREA_Y =
      CANVAS_ELEMENT.height - this._canvasStyle.spacing * 2 - this._canvasStyle.fontSize;

    const PADDING_X = this._canvasStyle.spacing * 2;

    const FULL_PERCENT = 100;
    const ARC_RADIUS = 4.5;
    const START_ANGLE = 0;
    const END_ANGLE = Math.PI * 2; // 360° means a complete circle

    let niceNumbers = generateNiceNumbersArray(0, MAXIMUM_VALUE);

    if (niceNumbers.length > DEFAULT_TICKS) {
      niceNumbers = generateNiceNumbersArray(0, MAXIMUM_VALUE, DEFAULT_TICKS / 2);
    }

    const ROW_HEIGHT = RENDERING_AREA_Y / (niceNumbers.length - 1);

    return {
      X_AXIS_DATA,
      ALL_SERIES_DATA_SOURCE,
      DATA_SOURCE_SERIES_LENGTH,
      MAXIMUM_VALUE,
      RENDERING_AREA_X,
      RENDERING_AREA_Y,
      AREA_Y_WIDTH,
      COLUMN_WIDTH_X,
      PADDING_X,
      FULL_PERCENT,
      ARC_RADIUS,
      START_ANGLE,
      END_ANGLE,
      ROW_HEIGHT,
      niceNumbers,
    };
  }

  /**
   * @summary - Render initial canvas element, with basic configuration.
   *
   * @private
   * @returns {void}
   */
  private _renderInitialCanvas(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

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
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const graphConfiguration = this._getGraphConfiguration();

    const { niceNumbers, ROW_HEIGHT } = graphConfiguration;

    // I am reversing the array here, because we need to start the rendering from the canvas's bottom position.
    niceNumbers.reverse();

    const formatNumber = new Intl.NumberFormat('en-US');

    const TEXT_SIZES = [];

    // Invisible text
    for (let i = 0; i < niceNumbers.length; i++) {
      const ITEM = niceNumbers[i];
      const FORMATTED_ITEM = formatNumber.format(ITEM);

      this._canvasContext.font = this._canvasStyle.font;
      this._canvasContext.fillText(FORMATTED_ITEM, -999, -999);

      const ITEM_WIDTH_AFTER_RENDER =
        this._canvasContext.measureText(FORMATTED_ITEM).width;

      TEXT_SIZES.push(ITEM_WIDTH_AFTER_RENDER);
    }

    this._startingPositionX = Math.max(...TEXT_SIZES);

    // Visible text
    for (let i = 0; i < niceNumbers.length; i++) {
      const ITEM = niceNumbers[i];
      const FORMATTED_ITEM = formatNumber.format(ITEM);
      const POSITION_Y = ROW_HEIGHT * i + this._canvasStyle.spacing;

      this._canvasContext.font = this._canvasStyle.font;
      this._canvasContext.fillStyle = '#000';
      this._canvasContext.textAlign = 'center';
      this._canvasContext.textBaseline = 'middle';

      this._canvasContext.fillText(
        FORMATTED_ITEM,
        this._startingPositionX,
        Math.abs(POSITION_Y)
      );
    }
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
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    const canvasContext = this._canvasContext;

    if (!canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const graphConfiguration = this._getGraphConfiguration();

    const { X_AXIS_DATA, AREA_Y_WIDTH, COLUMN_WIDTH_X } = graphConfiguration;

    for (let i = 0; i < X_AXIS_DATA.length; i++) {
      const ITEM = X_AXIS_DATA[i];
      const POSITION_X = AREA_Y_WIDTH + i * COLUMN_WIDTH_X;

      canvasContext.font = this._canvasStyle.font;
      canvasContext.fillStyle = '#000';
      canvasContext.textAlign = 'center';
      canvasContext.textBaseline = 'bottom';

      canvasContext.fillText(ITEM, POSITION_X, CANVAS_ELEMENT.height);
    }
  }

  /**
   * @summary - Render lines that are aligned with the legend on y-axis.
   *
   * @private
   * @returns {void}
   */
  private _renderBackgroundLines(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    const canvasContext = this._canvasContext;

    if (!canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const {
      niceNumbers,
      ROW_HEIGHT,
      RENDERING_AREA_X,
      RENDERING_AREA_Y,
      AREA_Y_WIDTH,
      X_AXIS_DATA,
      COLUMN_WIDTH_X,
    } = this._getGraphConfiguration();

    // Rows
    for (let i = 0; i < niceNumbers.length; i++) {
      const POSITION_Y = ROW_HEIGHT * i + this._canvasStyle.spacing;
      const POSITION_X = this._startingPositionX + this._canvasStyle.spacing;

      canvasContext.beginPath();

      canvasContext.moveTo(POSITION_X, POSITION_Y);

      canvasContext.lineTo(RENDERING_AREA_X + AREA_Y_WIDTH, POSITION_Y);
      canvasContext.strokeStyle = '#c9c9c9';
      canvasContext.lineWidth = 1;
      canvasContext.stroke();

      canvasContext.closePath();
    }

    // Columns
    for (let i = 0; i < X_AXIS_DATA.length; i++) {
      const POSITION_X = AREA_Y_WIDTH + i * COLUMN_WIDTH_X;

      canvasContext.beginPath();

      canvasContext.moveTo(POSITION_X, this._canvasStyle.spacing);

      canvasContext.lineTo(POSITION_X, RENDERING_AREA_Y + this._canvasStyle.spacing);
      canvasContext.strokeStyle = '#c9c9c9';
      canvasContext.lineWidth = 1;
      canvasContext.stroke();

      canvasContext.closePath();
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
      DATA_SOURCE_SERIES_LENGTH,
      ALL_SERIES_DATA_SOURCE,
      MAXIMUM_VALUE,
      FULL_PERCENT,
      AREA_Y_WIDTH,
      COLUMN_WIDTH_X,
      RENDERING_AREA_Y,
      START_ANGLE,
      END_ANGLE,
    } = graphConfiguration;

    this._canvasContext.strokeStyle = '#008000';
    this._canvasContext.lineWidth = ARC_RADIUS / 2;

    for (let i = 0; i < DATA_SOURCE_SERIES_LENGTH; i++) {
      const CURRENT_VALUE = ALL_SERIES_DATA_SOURCE[i];
      const CURRENT_PERCENT = (CURRENT_VALUE / MAXIMUM_VALUE) * FULL_PERCENT;

      const CURRENT_POSITION_X = AREA_Y_WIDTH + i * COLUMN_WIDTH_X + COLUMN_WIDTH_X / 2;
      const CURRENT_POSITION_Y =
        RENDERING_AREA_Y -
        (CURRENT_PERCENT / FULL_PERCENT) * RENDERING_AREA_Y +
        this._canvasStyle.fontSize;

      // lines
      const NEXT_VALUE = ALL_SERIES_DATA_SOURCE[i + 1];
      const NEXT_PERCENT = (NEXT_VALUE / MAXIMUM_VALUE) * FULL_PERCENT;
      const NEXT_POSITION_X =
        AREA_Y_WIDTH + (i + 1) * COLUMN_WIDTH_X + COLUMN_WIDTH_X / 2;

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

  public ngAfterViewInit(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    const CANVAS_CONTEXT =
      CANVAS_ELEMENT && CANVAS_ELEMENT.getContext('2d', { alpha: false });

    if (!CANVAS_ELEMENT || !CANVAS_CONTEXT) {
      throw Error('Canvas element not queried!');
    }

    this._canvasContext = CANVAS_CONTEXT;

    this._renderInitialCanvas();
    this._renderLegendY();
    this._renderLegendX();
    this._renderDataGraph();
    this._renderBackgroundLines();
  }
}
