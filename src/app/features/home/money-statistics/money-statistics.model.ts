enum DataSourceItemKey {
  ID = 'ID',
  NAME = 'NAME',
  VALUE = 'VALUE',
  TIMESTAMP = 'TIMESTAMP',
}

interface DataSourceItem {
  [DataSourceItemKey.ID]: number;
  [DataSourceItemKey.NAME]: string;
  [DataSourceItemKey.VALUE]: number;
  [DataSourceItemKey.TIMESTAMP]: number;
}

export type { DataSourceItem };
export { DataSourceItemKey };
