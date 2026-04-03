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
  renderingAreaX: number;
  renderingAreaY: number;
  areaWidthY: number;
  columnWidthX: number;
  rowHeight: number;
  niceNumbers: Array<number>;
  startingPositionX: number;
  maximumValue: number;
}

export type { DataSourceItem, DataSourceOptions, GraphConfiguration };

export { DataSourceItemKey };
