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
  REVENUE = 'REVENUE',
  EXPENSES = 'EXPENSES',
  GROSS_PROFIT = 'GROSS_PROFIT',
  PROFIT_MARGINS = 'PROFIT_MARGINS',
  DIVIDER = 'DIVIDER',
}

type DataSourceItemKey = 'type' | 'yearlyTotal' | Months;
type DataSourceItemValue = string | number;
type DataSourceItem = Partial<Record<DataSourceItemKey, DataSourceItemValue>>;
type DataSourceMonths = Partial<Record<Months, number>>;

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
  DataSourceItemKey,
};

export { Months, RowType };
