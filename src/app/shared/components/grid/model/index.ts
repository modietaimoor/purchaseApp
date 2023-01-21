import { ButtonType } from '@shared/components/button/button.component';
import { SafeAny } from '@core/safe-any-type';

export interface DataSource<T> {
  data: T[];
  totalCount: number;
  summary: number[];
}

export interface DataSourceSteamResult<T> {
  data?: DataSource<T>;
  error?: string;
}

export type ColumnType =
  | 'link'
  | 'link-date'
  | 'button'
  | 'currency'
  | 'date'
  | 'one-decimal-number'
  | 'buttonDropdown'
  | 'customButtonDropdown'
  | 'number'
  | 'bool-sign'
  | 'circle-sign'
  | 'multi-header'
  | 'custom'
  | 'buttons'
  | 'text-icon'
  | 'bold-text';

export interface Column {
  name: string;
  alignment?: 'left' | 'right' | 'center';
  dataField: string;
  summeryMessage?: string;
  summeryType?: SummeryType;
  filterName?: string;
  type?: ColumnType;
  format?: 'hh:mm a' | 'dd-MM-yyyy' | 'dd-MM-yyyy h:mm a' | 'MMMM y';
  enableButtonBasedOn?: string;
  onClick?: (id: number | string, event?: Event) => void;
  customizeText?: (evt) => string;
  buttons?: Button[];
  groupButtonGroupProperty?: string;
  nestedColumns?: Column[];
  hasCustomTemplate?: boolean;
  gridFormat?: unknown;
  gridType?: string;
  fixed?: boolean;
  fixedPosition?: 'left' | 'right';
  templateRef?: unknown;
  clickEvent?: unknown;
  summeryOperation?: 'count' | 'sum';
  src?: string;
  isLink?: boolean;
  allowSorting?: boolean;
  allowHeaderFiltering?: boolean;
  allowUpdating?: boolean;
  cssClass?: string;
}

export interface Button {
  icon: ButtonType;
  onClick: (id: number | string, event?: Event) => void;
  cssClasses?: string;
  title?: string;
  disabled?: boolean;
  show?: (row?: SafeAny) => boolean;
  buttonsList?: ButtonsList[];
}

export interface ButtonsList {
  value: number | string;
  name: string;
  icon?: string;
}

export enum SummeryType {
  Minute = 'Min',
  MegaByte = 'MB',
  GgByte = 'GB',
  Currency = '£'
}

export interface GridFilterGroup {
  selector: string;
  isExpanded: boolean;
}

export interface PageChange {
  skip: number;
  take: number;
  sort: Sort[];
  filter: unknown;
  group?: GridFilterGroup[];
}

export interface TotalSummary {
  selector: string;
  summaryType: string;
}

export interface Sort {
  selector: string;
  desc: boolean;
}

export interface LoadOptions {
  dataField: string;
  sort?: Sort[];
  group?: unknown;
  searchOperation: string;
  searchValue?: unknown;
  skip: number;
  take: number;
  totalSummary: TotalSummary[];
}
