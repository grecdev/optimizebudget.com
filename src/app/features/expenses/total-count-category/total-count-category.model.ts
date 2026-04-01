import { CategoryType } from '@shared/models/enums';

enum DataSourceItemKey {
  ID = 'ID',
  NAME = 'NAME',
  VALUE = 'VALUE',
}

interface DataSourceItem {
  [DataSourceItemKey.ID]: number;
  [DataSourceItemKey.NAME]: CategoryType;
  [DataSourceItemKey.VALUE]: Array<number>;
}

interface DataSourceOptions {
  xAxis: {
    data: Array<string>;
  };
  series: Array<DataSourceItem>;
}

interface GraphConfiguration {
  axisDataX: Array<string>;
  renderingAreaX: number;
  areaWidthY: number;
  columnWidthX: number;
  rowHeight: number;
  niceNumbers: Array<number>;
  startingPositionX: number;
}

export type { DataSourceItem, DataSourceOptions, GraphConfiguration };

export { DataSourceItemKey };
