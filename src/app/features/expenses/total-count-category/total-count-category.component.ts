/**
 * Incipient implementation of a "Vertical Bar Chart".
 */

import {
  type AfterViewInit,
  type OnDestroy,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { debounceTime, fromEvent, Subject } from 'rxjs';

import { MediaQueryService } from '@shared/services/media-query/media-query.service';

import { CategoryType } from '@shared/models/enums';
import { DEFAULT_TICKS, generateNiceNumbersArray } from '@script/nice-numbers';

import {
  DataSourceItemKey,
  type CanvasStyle,
  type DataSourceOptions,
  type GraphConfiguration,
} from './total-count-category.model';

@Component({
  selector: 'app-total-count-category',
  templateUrl: './total-count-category.component.html',
  styleUrls: ['./total-count-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalCountCategoryComponent implements AfterViewInit, OnDestroy {
  private readonly _mediaQueryService: MediaQueryService;

  /**
   * @summary - Destroy on cleanup.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _resizeEventDestroy$: Subject<void> = new Subject<void>();

  /**
   * @summary - Reference to be used outside its component, in order to obtain a "fluid" layout.
   *
   * @type {ElementRef<HTMLElement> | null}
   * @public
   */

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
  private readonly _canvasStyle: CanvasStyle = {
    spacingPXDefault: 16,
    spacingPX: 16,
    fontSizePXDefault: 18,
    fontSizePX: 18,
    fontFamily: "'Roboto', sans-serif",
    color: '#000',
  };

  /**
   * @summary - Configurations used throughout the graph.
   *
   * @type {GraphConfiguration}
   *
   * @private
   * @readonly
   */
  private readonly _graphConfiguration: GraphConfiguration = {
    legendTopHeight: 0,
    legendBottomHeight: 0,
    legendXAxisWidth: 0,
    legendYAxisWidth: 0,
    legendYAxisHeight: 0,
    //
    columnWidth: 0,
    rowHeight: 0,
    legendTopRectangleHeight: 0,
    //
    niceNumbersData: [],
    niceNumbersMaximumValue: 0,
    niceNumbersStartingPositionX: 0,
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
        [DataSourceItemKey.VALUE]: [10, 40, 50, 100],
        [DataSourceItemKey.COLOR]: 'rgba(255, 228, 196, 0.7)',
      },
      {
        [DataSourceItemKey.ID]: 1,
        [DataSourceItemKey.NAME]: CategoryType.GADGETS,
        [DataSourceItemKey.VALUE]: [20, 30, 60, 70],
        [DataSourceItemKey.COLOR]: 'rgba(196,239,255, 0.7)',
      },
      {
        [DataSourceItemKey.ID]: 2,
        [DataSourceItemKey.NAME]: CategoryType.CLOTHING,
        [DataSourceItemKey.VALUE]: [30, 20, 70, 60],
        [DataSourceItemKey.COLOR]: 'rgba(223, 196, 255, 0.7)',
      },
      {
        [DataSourceItemKey.ID]: 3,
        [DataSourceItemKey.NAME]: CategoryType.HOME,
        [DataSourceItemKey.VALUE]: [40, 10, 80, 50],
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
  @ViewChild('barChart') private readonly _canvasElement: ElementRef<HTMLCanvasElement> | null =
    null;

  @ViewChild('canvasWrapper') private readonly _canvasWrapper: ElementRef<HTMLDivElement> | null =
    null;

  constructor(mediaQueryService: MediaQueryService) {
    this._mediaQueryService = mediaQueryService;
  }

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
   * @summary - Set legend sizes on top, right, bottom, left.
   *
   * @private
   * @returns {void}
   */
  private _setLegendSizesConfig(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const PADDING_X = this._canvasStyle.spacingPX * 2;
    const LAST_ITEM_X_AXIS = this._dataSource.xAxis.data[this._dataSource.xAxis.data.length - 1];

    const LAST_ITEM_X_AXIS_MEASURE = this._canvasContext.measureText(LAST_ITEM_X_AXIS);

    const LEGEND_TOP_RECTANGLE_HEIGHT = 20;
    const LEGEND_TOP_HEIGHT = LEGEND_TOP_RECTANGLE_HEIGHT + this._canvasStyle.spacingPX;
    const LEGEND_BOTTOM_HEIGHT = this._canvasStyle.fontSizePX + this._canvasStyle.spacingPX;

    const LEGEND_Y_AXIS_WIDTH = this._graphConfiguration.niceNumbersStartingPositionX + PADDING_X;
    const LEGEND_Y_AXIS_HEIGHT = CANVAS_ELEMENT.height - LEGEND_TOP_HEIGHT - LEGEND_BOTTOM_HEIGHT;

    // I need to divide LAST_ITEM_X_AXIS_MEASURE.width, so half of the element don't go outside its column.
    const LEGEND_X_AXIS_WIDTH =
      CANVAS_ELEMENT.width - LEGEND_Y_AXIS_WIDTH - LAST_ITEM_X_AXIS_MEASURE.width / 2;

    const COLUMN_WIDTH = LEGEND_X_AXIS_WIDTH / this._dataSource.xAxis.data.length;

    const ROW_HEIGHT = LEGEND_Y_AXIS_HEIGHT / (this._graphConfiguration.niceNumbersData.length - 1);

    Object.assign(this._graphConfiguration, {
      //
      columnWidth: COLUMN_WIDTH,
      rowHeight: ROW_HEIGHT,
      legendTopRectangleHeight: LEGEND_TOP_RECTANGLE_HEIGHT,
      //
      legendTopHeight: LEGEND_TOP_HEIGHT,
      legendBottomHeight: LEGEND_BOTTOM_HEIGHT,
      //
      legendXAxisWidth: LEGEND_X_AXIS_WIDTH,
      legendYAxisWidth: LEGEND_Y_AXIS_WIDTH,
      legendYAxisHeight: LEGEND_Y_AXIS_HEIGHT,
    });
  }

  /**
   * @summary - Set data for nice numbers.
   *
   * @private
   * @returns {void}
   */
  private _setNiceNumbersConfig(): void {
    if (!this._canvasContext) {
      throw Error('Canvas context not found!');
    }

    const ALL_SERIES_DATA_SOURCE = this._dataSource.series
      .map(item => item[DataSourceItemKey.VALUE])
      .flat();

    const MAXIMUM_VALUE_DATA_SOURCE = Math.max(...ALL_SERIES_DATA_SOURCE);

    let niceNumbers = generateNiceNumbersArray(0, MAXIMUM_VALUE_DATA_SOURCE);

    if (niceNumbers.length > DEFAULT_TICKS) {
      niceNumbers = generateNiceNumbersArray(0, MAXIMUM_VALUE_DATA_SOURCE, DEFAULT_TICKS / 2);
    }

    const TEXT_SIZES = niceNumbers.map(item => {
      const FORMATTED_ITEM = this._formatNumber.format(item);

      return this._canvasContext!.measureText(FORMATTED_ITEM).width;
    });

    const MAX_VALUE_NICE_NUMBERS = Math.max(...niceNumbers);
    const STARTING_POSITION_X = Math.max(...TEXT_SIZES);

    Object.assign(this._graphConfiguration, {
      ...this._graphConfiguration,
      niceNumbersData: niceNumbers,
      niceNumbersStartingPositionX: STARTING_POSITION_X,
      niceNumbersMaximumValue: MAX_VALUE_NICE_NUMBERS,
    });
  }

  /**
   * @summary - Render initial canvas element, with basic configuration.
   *
   * @private
   * @returns {void}
   */
  private _renderInitialCanvas(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;
    const CANVAS_WRAPPER = this._canvasWrapper && this._canvasWrapper.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT || !CANVAS_WRAPPER) {
      throw Error('Canvas element not found!');
    }

    let size = 1;

    const { width: wrapperWidth, height: wrapperHeight } = CANVAS_WRAPPER.getBoundingClientRect();

    const isMobile = this._isMobile();
    const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

    if (isMobile) {
      size = 2;
    }

    this._canvasStyle.fontSizePX = this._canvasStyle.fontSizePXDefault * size;
    this._canvasStyle.spacingPX = this._canvasStyle.spacingPXDefault * size;

    CANVAS_ELEMENT.style.width = `${wrapperWidth}px`;
    CANVAS_ELEMENT.style.height = `${wrapperHeight}px`;

    CANVAS_ELEMENT.width = wrapperWidth * DEVICE_PIXEL_RATIO;
    CANVAS_ELEMENT.height = wrapperHeight * DEVICE_PIXEL_RATIO;

    this._canvasContext.clearRect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);

    this._canvasContext.beginPath();
    this._canvasContext.fillStyle = '#fff';
    this._canvasContext.fillRect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    this._canvasContext.rect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    this._canvasContext.closePath();

    this._canvasContext.font = `${this._canvasStyle.fontSizePX}px ${this._canvasStyle.fontFamily}`;
  }

  /**
   * @summary - Render legend on top side. Usually some colors + values.
   *
   * @private
   * @returns {void}
   */
  private _renderLegendTop(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    this._canvasContext.textBaseline = 'top';

    const SPACING = this._canvasStyle.spacingPX;
    const RECT_WIDTH = 45;
    const POSITION_Y_RECT =
      this._graphConfiguration.legendTopHeight / 2 -
      this._graphConfiguration.legendTopRectangleHeight / 2;

    const POSITION_Y_TEXT_CONTENT =
      this._graphConfiguration.legendTopHeight / 2 - this._canvasStyle.fontSizePX / 2;

    const MARGIN_RECT_AND_TEXT = 5;
    const SPACE_BETWEEN_ITEMS = SPACING;

    const ITEMS_CONTAINER_WIDTH = this._dataSource.series.reduce((total, current, index, self) => {
      const TEXT_CONTENT = current[DataSourceItemKey.NAME];

      const SPACING = index < self.length - 1 ? SPACE_BETWEEN_ITEMS : 0;

      const TEXT_CONTENT_WIDTH =
        this._canvasContext!.measureText(TEXT_CONTENT).width +
        RECT_WIDTH +
        MARGIN_RECT_AND_TEXT +
        SPACING;

      return total + TEXT_CONTENT_WIDTH;
    }, 0);

    const ITEMS_OVERLAP = ITEMS_CONTAINER_WIDTH > CANVAS_ELEMENT.width;

    if (ITEMS_OVERLAP) {
      return;
    }

    const HORIZONTAL_CENTER_POSITION =
      this._graphConfiguration.legendXAxisWidth / 2 - ITEMS_CONTAINER_WIDTH / 2;

    const RECT_START_POSITION =
      this._graphConfiguration.legendYAxisWidth + HORIZONTAL_CENTER_POSITION;

    const TEXT_CONTENT_START_POSITION =
      this._graphConfiguration.legendYAxisWidth +
      RECT_WIDTH +
      MARGIN_RECT_AND_TEXT +
      HORIZONTAL_CENTER_POSITION;

    let positionXRect = RECT_START_POSITION;
    let positionXTextContent = TEXT_CONTENT_START_POSITION;

    for (let i = 0; i < this._dataSource.series.length; i++) {
      const CURRENT_ITEM = this._dataSource.series[i];
      const CURRENT_TEXT_CONTENT = CURRENT_ITEM[DataSourceItemKey.NAME];
      const PREV_ITEM = this._dataSource.series[i - 1];

      /**
       * To render the items in a row format, we need to dynamically set their position
       * based on previous width, so we need to skip the first element.
       */
      const ITEM_WIDTH = PREV_ITEM
        ? this._canvasContext.measureText(PREV_ITEM[DataSourceItemKey.NAME]).width +
          RECT_WIDTH +
          MARGIN_RECT_AND_TEXT +
          SPACE_BETWEEN_ITEMS
        : 0;

      positionXRect += ITEM_WIDTH;
      positionXTextContent += ITEM_WIDTH;

      this._canvasContext.beginPath();

      this._canvasContext.fillStyle = CURRENT_ITEM[DataSourceItemKey.COLOR];
      this._canvasContext.fillRect(
        positionXRect,
        POSITION_Y_RECT,
        RECT_WIDTH,
        this._graphConfiguration.legendTopRectangleHeight
      );

      this._canvasContext.closePath();

      this._canvasContext.fillStyle = this._canvasStyle.color;
      this._canvasContext.fillText(
        CURRENT_TEXT_CONTENT,
        positionXTextContent,
        POSITION_Y_TEXT_CONTENT
      );
    }
  }

  /**
   * @summary - Dynamically render legend values on bottom side.
   *
   * Calculate the total labels to render on canvas,
   * based on the render area's width and the maximum label's width.
   *
   * @private
   * @returns {void}
   */
  private _renderLegendBottom(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const POSITION_Y = CANVAS_ELEMENT.height;

    this._canvasContext.textAlign = 'center';
    this._canvasContext.textBaseline = 'bottom';
    this._canvasContext.fillStyle = this._canvasStyle.color;

    const DATA = this._dataSource.xAxis.data;

    const OVERLAPS = DATA.some(item => {
      if (!this._canvasContext) {
        return;
      }

      const TEXT_CONTENT_WIDTH = this._canvasContext.measureText(item).width;

      return TEXT_CONTENT_WIDTH > this._graphConfiguration.columnWidth;
    });

    if (OVERLAPS) {
      return;
    }

    for (let i = 0; i < DATA.length; i++) {
      const ITEM = DATA[i];

      // Center the labels in the middle of the column.
      const POSITION_X =
        this._graphConfiguration.legendYAxisWidth +
        this._graphConfiguration.columnWidth / 2 +
        i * this._graphConfiguration.columnWidth;

      this._canvasContext.fillText(ITEM, POSITION_X, POSITION_Y);
    }
  }

  /**
   * @summary - Render dataSource values on the left side.
   *
   * @private
   * @returns {void}
   */
  private _renderLegendLeft(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    // I am reversing the array here, because we need to start the rendering from the canvas's bottom position.
    this._graphConfiguration.niceNumbersData.reverse();

    this._canvasContext.textAlign = 'right';
    this._canvasContext.textBaseline = 'middle';
    this._canvasContext.fillStyle = this._canvasStyle.color;

    for (let i = 0; i < this._graphConfiguration.niceNumbersData.length; i++) {
      const ITEM = this._graphConfiguration.niceNumbersData[i];
      const FORMATTED_ITEM = this._formatNumber.format(ITEM);

      const POSITION_Y =
        this._graphConfiguration.rowHeight * i + this._graphConfiguration.legendTopHeight;

      this._canvasContext.fillText(
        FORMATTED_ITEM,
        this._graphConfiguration.niceNumbersStartingPositionX,
        Math.abs(POSITION_Y)
      );
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

    if (!this._canvasContext || !CANVAS_ELEMENT) {
      throw Error('Canvas context not found!');
    }

    const EXTRA_COLUMN_LINES = 1; // I need to add an extra line at the end of the graph.
    const STROKE_STYLE = '#b3b3b3';
    const LINE_WIDTH = 0.5;

    // X-axis lines
    for (let i = 0; i < this._graphConfiguration.niceNumbersData.length; i++) {
      const POSITION_Y =
        this._graphConfiguration.rowHeight * i + this._graphConfiguration.legendTopHeight;

      this._canvasContext.beginPath();

      this._canvasContext.moveTo(
        this._graphConfiguration.legendYAxisWidth - this._canvasStyle.spacingPX,
        POSITION_Y
      );

      this._canvasContext.lineTo(
        this._graphConfiguration.legendXAxisWidth + this._graphConfiguration.legendYAxisWidth,
        POSITION_Y
      );

      this._canvasContext.strokeStyle = STROKE_STYLE;
      this._canvasContext.lineWidth = LINE_WIDTH;

      this._canvasContext.stroke();
      this._canvasContext.closePath();
    }

    // Y-axis lines
    for (let i = 0; i < this._dataSource.xAxis.data.length + EXTRA_COLUMN_LINES; i++) {
      const POSITION_X =
        this._graphConfiguration.legendYAxisWidth + i * this._graphConfiguration.columnWidth;

      const POSITION_Y =
        this._canvasStyle.spacingPX +
        this._graphConfiguration.legendYAxisHeight +
        this._graphConfiguration.legendTopHeight;

      this._canvasContext.beginPath();

      this._canvasContext.moveTo(POSITION_X, this._graphConfiguration.legendTopHeight);

      this._canvasContext.lineTo(POSITION_X, POSITION_Y);

      this._canvasContext.strokeStyle = STROKE_STYLE;
      this._canvasContext.lineWidth = LINE_WIDTH;

      this._canvasContext.stroke();
      this._canvasContext.closePath();
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

    const MAXIMUM_VALUE = this._graphConfiguration.niceNumbersMaximumValue;
    const SPACING = this._canvasStyle.spacingPX;
    const COLUMN_START_POSITION = this._graphConfiguration.legendYAxisWidth + SPACING;
    const SPACING_X = SPACING * 2; // "padding" left and right

    // Match values with each given column
    for (let seriesIndex = 0; seriesIndex < this._dataSource.series.length; seriesIndex++) {
      const SERIES_ITEM = this._dataSource.series[seriesIndex];

      // We have one space remaining on the right side which represents "padding-right";
      const NUMBER_OF_SPACES_BETWEEN_BARS = SERIES_ITEM[DataSourceItemKey.VALUE].length - 1;

      const SPACING_BETWEEN_BARS = SPACING * NUMBER_OF_SPACES_BETWEEN_BARS;

      const COLUMN_AVAILABLE_WIDTH =
        this._graphConfiguration.columnWidth - SPACING_BETWEEN_BARS - SPACING_X;

      const BAR_WIDTH_PX = COLUMN_AVAILABLE_WIDTH / this._dataSource.xAxis.data.length;

      for (let columnIndex = 0; columnIndex < this._dataSource.xAxis.data.length; columnIndex++) {
        const CORRESPONDING_VALUE = SERIES_ITEM[DataSourceItemKey.VALUE][columnIndex];
        const CORRESPONDING_VALUE_FRACTION = CORRESPONDING_VALUE / MAXIMUM_VALUE;

        const THRESHOLD_POSITION_Y =
          this._graphConfiguration.legendYAxisHeight * CORRESPONDING_VALUE_FRACTION;

        let positionX = COLUMN_START_POSITION;

        positionX += BAR_WIDTH_PX * seriesIndex;
        positionX += SPACING * seriesIndex;

        // Doing this because we need to position the bars in their corresponding columns
        positionX += this._graphConfiguration.columnWidth * columnIndex;

        const POSITION_Y =
          this._graphConfiguration.legendYAxisHeight + this._graphConfiguration.legendTopHeight;

        this._canvasContext.beginPath();

        this._canvasContext.fillStyle = SERIES_ITEM[DataSourceItemKey.COLOR];

        this._canvasContext.fillRect(positionX, POSITION_Y, BAR_WIDTH_PX, -THRESHOLD_POSITION_Y);

        this._canvasContext.closePath();
      }
    }
  }

  /**
   * @summary - Paint canvas, all functions stacked together.
   *
   * @private
   * @returns {void}
   */
  private _paintCanvas(): void {
    requestAnimationFrame(() => {
      this._renderInitialCanvas();
      //
      this._setNiceNumbersConfig();
      this._setLegendSizesConfig();
      //
      this._renderLegendTop();
      this._renderLegendBottom();
      this._renderLegendLeft();
      //
      this._renderBackgroundLines();
      this._renderDataBars();
    });
  }

  /**
   * @summary - Check if device is mobile.
   *
   * @private
   * @returns {void}
   */
  private _isMobile(): boolean {
    return (
      window.innerWidth <= this._mediaQueryService.breakpointsPX.xl &&
      window.innerHeight <= this._mediaQueryService.breakpointsPX.xl
    );
  }

  /**
   * @summary - Initialize the canvas context.
   *
   * @private
   * @returns {void}
   */
  private _initCanvasContext(): void {
    const CANVAS_ELEMENT = this._canvasElement && this._canvasElement.nativeElement;

    const CANVAS_CONTEXT = CANVAS_ELEMENT && CANVAS_ELEMENT.getContext('2d', { alpha: false });

    if (!CANVAS_ELEMENT || !CANVAS_CONTEXT) {
      throw Error('Canvas element not queried!');
    }

    this._canvasContext = CANVAS_CONTEXT;
  }

  /**
   * @summary - For whenever we destroy the component.
   *
   * @private
   * @returns {void}
   */
  private _initCleanup(): void {
    this._resizeEventDestroy$.next();
    this._resizeEventDestroy$.complete();
  }

  public ngAfterViewInit(): void {
    this._initCanvasContext();
    this._paintCanvas();

    fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe({
        next: () => {
          this._paintCanvas();
        },
      });
  }

  public ngOnDestroy(): void {
    this._initCleanup();
  }
}
