import { BoldTextColumnComponent } from '@shared/components/grid/columns/bold-text-column.component';
import { CircleSignColumnComponent } from '@shared/components/grid/columns/circle-sign-column.component';
import { CustomButtonDropdownComponent } from '@shared/components/grid/columns/custom-button-dropdown.component';

import { BooleanSignColumnComponent } from '../columns/boolean-sign-column.component';
import { ButtonColumnComponent } from '../columns/button-column.component';
import { ButtonDropdownColumnComponent } from '../columns/button-dropdown.component';
import { ButtonsColumnComponent } from '../columns/buttons-column.component';
import { ColumnComponent } from '../columns/column.component';
import { CustomColumnComponent } from '../columns/custom-column.component';
import { LinkColumnComponent } from '../columns/link-column.component';
import { ColumnCellComponent } from './column-cell.component';
import { DataGridComponent } from './data-grid-server-side.component';

export const DataGridServerSideComponents = [
  DataGridComponent,
  LinkColumnComponent,
  ButtonColumnComponent,
  BooleanSignColumnComponent,
  CircleSignColumnComponent,
  ColumnCellComponent,
  ColumnComponent,
  CustomColumnComponent,
  ButtonDropdownColumnComponent,
  CustomButtonDropdownComponent,
  ButtonsColumnComponent,
  BoldTextColumnComponent
];
