enum DataSourceItemKey {
  ID = 'id',
  DAY = 'day',
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
  [DataSourceItemKey.DAY]: number | null;
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
