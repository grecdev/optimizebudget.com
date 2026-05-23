enum Months {
  JANUARY = 'January',
  FEBRUARY = 'February',
  MARCH = 'March',
  APRIL = 'April',
  MAY = 'May',
  JUNE = 'June',
  JULY = 'July',
  AUGUST = 'August',
  SEPTEMBER = 'September',
  OCTOBER = 'October',
  NOVEMBER = 'November',
  DECEMBER = 'December',
}

enum RowType {
  REVENUE = 'Revenue',
  EXPENSES = 'Expenses',
}

type DataSourceItemKey = 'type' | 'yearlyTotal' | Months;
type DataSourceItemValue = string | number;
type DataSourceItem = Partial<Record<DataSourceItemKey, DataSourceItemValue>>;
type DataSourceMonths = Record<Months, number>;

type DataSource = Array<DataSourceItem>;
type DisplayedColumns = Array<string>;

interface GetDataSourceItemOptions {
  type: RowType;
  data: DataSourceMonths;
}

export type {
  DisplayedColumns,
  DataSource,
  DataSourceItem,
  DataSourceMonths,
  GetDataSourceItemOptions,
};
export { Months, RowType };
