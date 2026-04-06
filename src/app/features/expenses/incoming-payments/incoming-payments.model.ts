enum IncomingPaymentsItemKey {
  ID = 'ID',
  NAME = 'NAME',
  AMOUNT = 'AMOUNT',
  TIMESTAMP = 'TIMESTAMP',
}

interface IncomingPaymentsItem {
  [IncomingPaymentsItemKey.ID]: number;
  [IncomingPaymentsItemKey.NAME]: string;
  [IncomingPaymentsItemKey.AMOUNT]: number;
  [IncomingPaymentsItemKey.TIMESTAMP]: number;
}

type IncomingPaymentsDataSource = Array<IncomingPaymentsItem>;

export type { IncomingPaymentsItem, IncomingPaymentsDataSource };
export { IncomingPaymentsItemKey };
