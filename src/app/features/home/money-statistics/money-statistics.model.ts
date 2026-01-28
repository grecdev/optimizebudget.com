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

export type { DataSourceItem, DataSourceOptions };
export { DataSourceItemKey };
