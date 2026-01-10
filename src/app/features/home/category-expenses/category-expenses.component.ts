import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { type CategoryExpenseItem } from './category-expenses.model';
import { CategoryType } from '@shared/models/enums';

@Component({
  selector: 'app-category-expenses',
  templateUrl: './category-expenses.component.html',
  styleUrls: ['./category-expenses.component.scss'],
})
export class CategoryExpensesComponent implements AfterViewInit {
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
   * @summary - Canvas sizes
   *
   * @type {{
   *     width: number;
   *     height: number;
   *   }}
   * @private
   */
  private readonly _canvasSize: {
    width: number;
    height: number;
  } = {
    width: 300,
    height: 300,
  };

  /**
   * @summary - The data we want to render in our pie chart.
   *
   * @type {Array<CategoryExpenseItem>}
   * @public
   */
  public readonly data: Array<CategoryExpenseItem> = [
    {
      id: 0,
      color: '#27F5B0',
      name: CategoryType.FOOD,
      value: 123,
    },
    {
      id: 1,
      color: '#276CF5',
      name: CategoryType.SHOPPING,
      value: 456,
    },
  ];

  /**
   * @summary - Mapped array with only the values from our chart data.
   *
   * @type {Array<number>}
   * @private
   */
  private readonly _dataOnlyValues: Array<number> = [];

  /**
   * @summary - The total from all data values.
   *
   * @type {number}
   * @private
   */
  private readonly _totalValues: number = 0;

  /**
   * @summary - The starting angle of first slice.
   *
   * @type {number}
   * @private
   */
  private _startingAngle: number = 0;

  /**
   * @summary - Element reference to the HTML Canvas element.
   *
   * @type {ElementRef<HTMLCanvasElement> | null}
   * @public
   */
  @ViewChild('pieChart') public canvasElement: ElementRef<HTMLCanvasElement> | null = null;

  constructor(...args: Array<unknown>);
  constructor() {
    this._dataOnlyValues = this.data.map(item => item.value);

    this._totalValues = this._dataOnlyValues.reduce((total, currentItem) => total + currentItem, 0);
  }

  trackByCustom(_index: number, item: CategoryExpenseItem) {
    return item.id;
  }

  ngAfterViewInit() {
    const CANVAS_ELEMENT = this.canvasElement && this.canvasElement.nativeElement;
    const CANVAS_CONTEXT = CANVAS_ELEMENT && CANVAS_ELEMENT.getContext('2d');

    if (!CANVAS_ELEMENT || !CANVAS_CONTEXT) {
      throw Error('Canvas element not queried!');
    }

    CANVAS_ELEMENT.style.width = `${this._canvasSize.width}px`;
    CANVAS_ELEMENT.style.height = `${this._canvasSize.height}px`;

    CANVAS_ELEMENT.width = Math.floor(this._canvasSize.width * this._devicePixelRatio);
    CANVAS_ELEMENT.height = Math.floor(this._canvasSize.height * this._devicePixelRatio);

    // Calculate angles
    this._dataOnlyValues.forEach((item, index) => {
      const CURRENT_RADIAN_ANGLE = (item / this._totalValues) * Math.PI * 2;

      CANVAS_CONTEXT.lineWidth = 5;

      CANVAS_CONTEXT.beginPath();

      // When we divide the width and height by 2 we get the center of the arc.
      CANVAS_CONTEXT.moveTo(CANVAS_ELEMENT.width / 2, CANVAS_ELEMENT.height / 2);

      CANVAS_CONTEXT.arc(
        CANVAS_ELEMENT.width / 2,
        CANVAS_ELEMENT.height / 2,
        CANVAS_ELEMENT.width / 2.05, // Set a smaller radius, so it won't overflow
        this._startingAngle,
        this._startingAngle + CURRENT_RADIAN_ANGLE
      );

      CANVAS_CONTEXT.closePath();

      CANVAS_CONTEXT.fillStyle = this.data[index].color;
      CANVAS_CONTEXT.fill();
      CANVAS_CONTEXT.stroke();

      this._startingAngle += CURRENT_RADIAN_ANGLE;
    });
  }
}
