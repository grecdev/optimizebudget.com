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
  X_AXIS_DATA: Array<string>;
  ALL_SERIES_DATA_SOURCE: Array<number>;
  DATA_SOURCE_SERIES_LENGTH: number;
  MAXIMUM_VALUE: number;
  RENDERING_AREA_X: number;
  RENDERING_AREA_Y: number;
  AREA_Y_WIDTH: number;
  COLUMN_WIDTH_X: number;
  PADDING_X: number;
  FULL_PERCENT: number;
  ARC_RADIUS: number;
  START_ANGLE: number;
  END_ANGLE: number;
  ROW_HEIGHT: number;
  niceNumbers: Array<number>;
}

export type { DataSourceItem, DataSourceOptions, GraphConfiguration };

export { DataSourceItemKey };
