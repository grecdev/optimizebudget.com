import { TableNames } from '@shared/models/enums';

interface InsertOptions {
  relation: TableNames;
  data: Object | Array<unknown>;
}

export type { InsertOptions };
