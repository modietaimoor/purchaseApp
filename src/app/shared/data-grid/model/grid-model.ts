export interface Column {
    name: string;
    alignment?: 'left' | 'right' | 'center';
    dataField: string;
    width?: number;
    //summeryMessage?: string;
    //summeryType?: SummeryType;
    //filterName?: string;
    type?: ColumnType;
    format?: 'shortDateShortTime' | 'dd-MM-yyyy' | 'dd-MM-yyyy h:mm a' | 'MMMM y';
    //enableButtonBasedOn?: string;
    //onClick?: (id: number | string, event?: Event) => void;
    //buttons?: Button[];
    //groupButtonGroupProperty?: string;
    //nestedColumns?: Column[];
    hasCustomTemplate?: boolean;
    //gridFormat?: unknown;
    //gridType?: string;
    //fixed?: boolean;
    //fixedPosition?: 'left' | 'right';
    //templateRef?: unknown;
    //clickEvent?: unknown;
    //summeryOperation?: 'count' | 'sum';
    //src?: string;
    //isLink?: boolean;
    //allowSorting?: boolean;
    //allowHeaderFiltering?: boolean;
    allowUpdating?: boolean;
    cssClass?: string;
  }

  export type ColumnType =
  | 'link'
  | 'link-date'
  | 'button'
  | 'currency'
  | 'date'
  | 'KB'
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