enum DataSourceItemKey {
  ID = 'id',
  YEAR = 'year',
  DAY = 'day',
  MONTH = 'month',
  CURRENT_DAY = 'currentDay',
}

interface GetDaysInMonthOptions {
  month: number;
  year: number;
}

interface GetFirstWeekDayOptions {
  month: number;
  year: number;
}

interface GetLastWeekDayOptions {
  month: number;
  year: number;
}

interface DataSourceItem {
  [DataSourceItemKey.ID]: number;
  [DataSourceItemKey.YEAR]: number;
  [DataSourceItemKey.MONTH]: number;
  [DataSourceItemKey.DAY]: number;
  [DataSourceItemKey.CURRENT_DAY]?: boolean;
}

type DataSource = Array<DataSourceItem>;

export type {
  GetDaysInMonthOptions,
  GetFirstWeekDayOptions,
  GetLastWeekDayOptions,
  DataSourceItem,
  DataSource,
};

export { DataSourceItemKey };
