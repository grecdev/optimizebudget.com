enum DataSourceItemKey {
  ID = 'ID',
  NAME = 'NAME',
  VALUE = 'VALUE',
}

interface DataSourceItem {
  [DataSourceItemKey.ID]: number;
  [DataSourceItemKey.NAME]: string;
  [DataSourceItemKey.VALUE]: Array<number>;
}

interface DataSourceOptions {
  xAxis: {
    data: Array<string>;
  };
  series: Array<DataSourceItem>;
}

interface GraphConfiguration {
  DATA_SOURCE: Array<string>;
  ALL_VALUES: Array<number>;
  DATA_LENGTH: number;
  MAXIMUM_VALUE: number;
  RENDERING_AREA_X: number;
  RENDERING_AREA_Y: number;
  AREA_Y_WIDTH: number;
  COLUMN_WIDTH: number;
  PADDING_X: number;
  FULL_PERCENT: number;
  ARC_RADIUS: number;
  START_ANGLE: number;
  END_ANGLE: number;
}

export type { DataSourceItem, DataSourceOptions, GraphConfiguration };
export { DataSourceItemKey };
