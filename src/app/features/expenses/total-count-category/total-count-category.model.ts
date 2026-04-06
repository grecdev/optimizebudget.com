import { CategoryType } from '@shared/models/enums';

enum DataSourceItemKey {
  ID = 'ID',
  NAME = 'NAME',
  VALUE = 'VALUE',
  COLOR = 'COLOR',
}

interface DataSourceItem {
  [DataSourceItemKey.ID]: number;
  [DataSourceItemKey.NAME]: CategoryType;
  [DataSourceItemKey.VALUE]: Array<number>;
  [DataSourceItemKey.COLOR]: string;
}

interface DataSourceOptions {
  xAxis: {
    data: Array<string>;
  };
  series: Array<DataSourceItem>;
}

interface GraphConfiguration {
  legendTopHeight: number;
  legendBottomHeight: number;
  legendXAxisWidth: number;
  legendYAxisWidth: number;
  legendYAxisHeight: number;
  //
  columnWidth: number;
  rowHeight: number;
  legendTopRectangleHeight: number;
  //
  niceNumbersData: Array<number>;
  niceNumbersMaximumValue: number;
  niceNumbersStartingPositionX: number;
}

interface CanvasStyle {
  width: number;
  height: number;
  spacing: number;
  fontSize: number;
  lineHeight: number;
  font: string;
  color: string;
}

export type { DataSourceItem, DataSourceOptions, GraphConfiguration, CanvasStyle };

export { DataSourceItemKey };
