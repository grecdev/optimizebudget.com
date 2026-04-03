/**
 * Incipient implementation of a "Vertical Bar Chart".
 */

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
   * @summary - Format type for numbers.
   *
   * @type {Intl.NumberFormat}
   *
   * @private
   * @readonly
   */
  private readonly _formatNumber: Intl.NumberFormat = new Intl.NumberFormat('en-US');

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
    font: "normal 400 1rem/1.25 'Roboto', sans-serif",
  };

  /**
   * @summary - Configurations used throughout the graph.
   *
   * @type {GraphConfiguration}
   *
   * @private
   */
  private _graphConfiguration: GraphConfiguration = {
    areaWidthY: 0,
    columnWidthX: 0,
    niceNumbers: [],
    renderingAreaX: 0,
    renderingAreaY: 0,
    rowHeight: 0,
    startingPositionX: 0,
    maximumValue: 0,
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
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    },
    series: [
      {
        [DataSourceItemKey.ID]: 0,
        [DataSourceItemKey.NAME]: CategoryType.FOOD,
        [DataSourceItemKey.VALUE]: [23, 47, 15, 62],
        [DataSourceItemKey.COLOR]: 'rgba(255, 228, 196, 0.7)',
      },
      {
        [DataSourceItemKey.ID]: 1,
        [DataSourceItemKey.NAME]: CategoryType.GADGETS,
        [DataSourceItemKey.VALUE]: [89, 34, 71, 45],
        [DataSourceItemKey.COLOR]: 'rgba(196,239,255, 0.7)',
      },
      {
        [DataSourceItemKey.ID]: 2,
        [DataSourceItemKey.NAME]: CategoryType.CLOTHING,
        [DataSourceItemKey.VALUE]: [56, 18, 93, 37],
        [DataSourceItemKey.COLOR]: 'rgba(223, 196, 255, 0.7)',
      },
      {
        [DataSourceItemKey.ID]: 3,
        [DataSourceItemKey.NAME]: CategoryType.HOME,
        [DataSourceItemKey.VALUE]: [42, 76, 28, 85],
        [DataSourceItemKey.COLOR]: 'rgba(255,196,196, 0.7)',
      },
    ],
  };

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
   * @returns {void}
   */
  private _setGraphConfiguration(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const LAST_ITEM = this._dataSource.xAxis.data[this._dataSource.xAxis.data.length - 1];
    const LAST_ITEM_MEASURE = this._canvasContext.measureText(LAST_ITEM);

    const ALL_SERIES_DATA_SOURCE = this._dataSource.series
      .map(item => item[DataSourceItemKey.VALUE])
      .flat();

    const MAXIMUM_VALUE = Math.max(...ALL_SERIES_DATA_SOURCE);

    let niceNumbers = generateNiceNumbersArray(0, MAXIMUM_VALUE);

    if (niceNumbers.length > DEFAULT_TICKS) {
      niceNumbers = generateNiceNumbersArray(0, MAXIMUM_VALUE, DEFAULT_TICKS / 2);
    }

    const TEXT_SIZES = niceNumbers.map(item => {
      const FORMATTED_ITEM = this._formatNumber.format(item);

      return this._canvasContext!.measureText(FORMATTED_ITEM).width;
    });

    const STARTING_POSITION_X = Math.max(...TEXT_SIZES);
    const AREA_Y_WIDTH = STARTING_POSITION_X + this._canvasStyle.spacing * 2;

    const RENDERING_AREA_X =
      CANVAS_ELEMENT.width - AREA_Y_WIDTH - LAST_ITEM_MEASURE.width / 2;

    const COLUMN_WIDTH_X = RENDERING_AREA_X / this._dataSource.xAxis.data.length;

    const RENDERING_AREA_Y =
      CANVAS_ELEMENT.height - this._canvasStyle.spacing * 2 - this._canvasStyle.fontSize;

    const ROW_HEIGHT = RENDERING_AREA_Y / (niceNumbers.length - 1);

    this._graphConfiguration = {
      areaWidthY: AREA_Y_WIDTH,
      columnWidthX: COLUMN_WIDTH_X,
      niceNumbers,
      renderingAreaX: RENDERING_AREA_X,
      renderingAreaY: RENDERING_AREA_Y,
      rowHeight: ROW_HEIGHT,
      startingPositionX: STARTING_POSITION_X,
      maximumValue: MAXIMUM_VALUE,
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

    this._canvasContext.font = this._canvasStyle.font;
    this._canvasContext.fillStyle = '#000';
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

    // I am reversing the array here, because we need to start the rendering from the canvas's bottom position.
    this._graphConfiguration.niceNumbers.reverse();

    this._canvasContext.textAlign = 'right';
    this._canvasContext.textBaseline = 'middle';

    for (let i = 0; i < this._graphConfiguration.niceNumbers.length; i++) {
      const ITEM = this._graphConfiguration.niceNumbers[i];
      const FORMATTED_ITEM = this._formatNumber.format(ITEM);

      const POSITION_Y =
        this._graphConfiguration.rowHeight * i + this._canvasStyle.spacing;

      this._canvasContext.fillText(
        FORMATTED_ITEM,
        this._graphConfiguration.startingPositionX,
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

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    this._canvasContext.textAlign = 'center';
    this._canvasContext.textBaseline = 'bottom';
    this._canvasContext.fillStyle = '#000';

    for (let i = 0; i < this._dataSource.xAxis.data.length; i++) {
      const ITEM = this._dataSource.xAxis.data[i];

      // Center the labels in the middle of the column.
      const POSITION_X =
        this._graphConfiguration.areaWidthY +
        this._graphConfiguration.columnWidthX / 2 +
        i * this._graphConfiguration.columnWidthX;

      this._canvasContext.fillText(ITEM, POSITION_X, CANVAS_ELEMENT.height);
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

    const EXTRA_COLUMN_LINES = 1; // I need to add an extra line at the end of the graph.
    const STROKE_STYLE = '#b3b3b3';
    const LINE_WIDTH = 0.5;

    // X-axis lines
    for (let i = 0; i < this._graphConfiguration.niceNumbers.length; i++) {
      const POSITION_Y =
        this._graphConfiguration.rowHeight * i + this._canvasStyle.spacing;

      canvasContext.beginPath();

      canvasContext.moveTo(
        this._graphConfiguration.areaWidthY - this._canvasStyle.spacing,
        POSITION_Y
      );

      canvasContext.lineTo(
        this._graphConfiguration.renderingAreaX + this._graphConfiguration.areaWidthY,
        POSITION_Y
      );

      canvasContext.strokeStyle = STROKE_STYLE;
      canvasContext.lineWidth = LINE_WIDTH;

      canvasContext.stroke();
      canvasContext.closePath();
    }

    // Y-axis lines
    for (let i = 0; i < this._dataSource.xAxis.data.length + EXTRA_COLUMN_LINES; i++) {
      const POSITION_X =
        this._graphConfiguration.areaWidthY + i * this._graphConfiguration.columnWidthX;

      canvasContext.beginPath();

      canvasContext.moveTo(POSITION_X, this._canvasStyle.spacing);
      canvasContext.lineTo(POSITION_X, CANVAS_ELEMENT.height - this._canvasStyle.spacing);

      canvasContext.strokeStyle = STROKE_STYLE;
      canvasContext.lineWidth = LINE_WIDTH;

      canvasContext.stroke();
      canvasContext.closePath();
    }
  }

  /**
   * @summary - Render bars based on data source.
   *
   * @private
   * @returns {void}
   */
  private _renderDataBars(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const MAXIMUM_VALUE = this._graphConfiguration.maximumValue;
    const SPACING = this._canvasStyle.spacing;
    const COLUMN_START_POSITION = this._graphConfiguration.areaWidthY + SPACING;
    const SPACING_X = SPACING * 2; // "padding" left and right

    // Match values with each given column
    for (
      let seriesIndex = 0;
      seriesIndex < this._dataSource.series.length;
      seriesIndex++
    ) {
      const SERIES_ITEM = this._dataSource.series[seriesIndex];

      // We have one space remaining on the right side which represents "padding-right";
      const NUMBER_OF_SPACES_BETWEEN_BARS =
        SERIES_ITEM[DataSourceItemKey.VALUE].length - 1;

      const SPACING_BETWEEN_BARS = SPACING * NUMBER_OF_SPACES_BETWEEN_BARS;

      const COLUMN_AVAILABLE_WIDTH =
        this._graphConfiguration.columnWidthX - SPACING_BETWEEN_BARS - SPACING_X;

      const BAR_WIDTH_PX =
        COLUMN_AVAILABLE_WIDTH / SERIES_ITEM[DataSourceItemKey.VALUE].length;

      for (
        let columnIndex = 0;
        columnIndex < this._dataSource.xAxis.data.length;
        columnIndex++
      ) {
        const CORRESPONDING_VALUE = SERIES_ITEM[DataSourceItemKey.VALUE][columnIndex];
        const CORRESPONDING_VALUE_FRACTION = CORRESPONDING_VALUE / MAXIMUM_VALUE;

        const THRESHOLD_POSITION_Y =
          this._graphConfiguration.renderingAreaY * CORRESPONDING_VALUE_FRACTION;

        let positionX = COLUMN_START_POSITION;

        positionX += BAR_WIDTH_PX * seriesIndex;
        positionX += SPACING * seriesIndex;

        // Doing this because we need to position the bars in their corresponding columns
        positionX += this._graphConfiguration.columnWidthX * columnIndex;

        const POSITION_Y =
          this._graphConfiguration.renderingAreaY + this._canvasStyle.spacing;

        this._canvasContext.beginPath();

        this._canvasContext.fillStyle = SERIES_ITEM[DataSourceItemKey.COLOR];

        this._canvasContext.fillRect(
          positionX,
          POSITION_Y,
          BAR_WIDTH_PX,
          -THRESHOLD_POSITION_Y
        );

        this._canvasContext.closePath();
      }
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
    this._setGraphConfiguration();
    this._renderLegendY();
    this._renderLegendX();
    this._renderBackgroundLines();
    this._renderDataBars();
  }
}
