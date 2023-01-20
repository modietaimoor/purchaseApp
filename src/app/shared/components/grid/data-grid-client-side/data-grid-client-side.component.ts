import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { DxDataGridComponent } from 'devextreme-angular';
import { SafeAny } from 'src/app/core/safe-any-type';

import { BaseGridComponent } from '../base-grid.component';
import { DataGridService } from '../data-grid.service';
import * as Utils from '../grid.utils';
import { Column, SummeryType } from '../model';
import { DxFormatter } from './dx-format-data-source';

@Component({
  selector: 'app-data-grid-client-side',
  templateUrl: './data-grid-client-side.component.html',
  styles: [
    `
      .download-buttons {
        margin-bottom: 10px;
      }

      :host::ng-deep.dx-datagrid-headers .dx-datagrid-table .dx-header-row > td {
        background-color: #005c8d !important;
      }

      :host::ng-deep.dx-datagrid-headers .dx-header-row > td > .dx-datagrid-text-content {
        color: #fff !important;
        font-family: 'Open Sans';
      }
    `
  ]
})
export class DataGridClientSideComponent<T> extends BaseGridComponent implements OnChanges {
  @ContentChild(TemplateRef) templateRef: TemplateRef<unknown>;
  @ViewChild(DxDataGridComponent) readonly dxDataGrid: DxDataGridComponent;
  @Input() readonly key: string = '';
  @Input() readonly pageSize: number = 10;
  @Input() readonly dataSource: T[];
  @Input() columns: Column[];
  @Input() readonly exportName: string;
  @Input() readonly selectionMode: 'single' | 'multiple';
  @Input() readonly scrollMode: 'standard' | 'virtual' | 'infinite';
  @Input() nested: boolean;
  @Input() showSummary: boolean = true;
  @Input() showExport: boolean = true;
  @Input() width: number | string;
  @Input() height: number | string;
  @Input() showPageSizeSelector = true;
  @Input() showPager = true;
  @Input() showFilterRow = true;
  @Input() columnAutoWidth: boolean = false;
  @Input() showUselessButton: boolean = false;
  @Input() selectedRows: number[] = [];
  @Input() hasCustom: boolean = false;
  @Input() showHeaderFilter: boolean = true;
  @Input() useIcons: boolean = true;
  @Input() allowUpdating: boolean = false;
  @Input() allowDeleting: boolean = false;
  @Output() readonly rowSelected: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Output() readonly rowsSelected: EventEmitter<SafeAny[]> = new EventEmitter<SafeAny[]>();
  @Output() readonly cellClicked: EventEmitter<SafeAny> = new EventEmitter<SafeAny>();
  @Output() readonly rowUpdating: EventEmitter<SafeAny> = new EventEmitter<SafeAny>();
  selectedValue: string | number;
  isRowSelection: boolean = true;
  summaries: Array<{ name: string; format: string; summeryOperation: string; valueFormat: string }> = [];
  allowColumnResizing = true;
  noDataTextEncoded = 'No Data';
  flattenColumns: Column[] = [];

  allowedPageSizes = [5, 10, 20, 50];
  showInfo = true;
  pageDisplayMode = 'full';

  // Grid Appearance
  showBorders = true;
  rowAlternationEnabled = true;
  showRowLines = true;
  showColumnLines = true;
  dateFormat = 'monthAndYear';
  summaryRendered = false;
  // TODO : find another way to stop reformating summary multiple times;

  constructor(private dataGridService: DataGridService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const columnsChanged = changes.columns && changes.columns.currentValue !== changes.columns.previousValue;
    if (columnsChanged) {
      this.flattenNestedColumns();
      this.columns = this.columns.map(col => ({
        ...col,
        name: col.name === '' ? col.dataField : col.name,
        gridType: this.getColumnGridType(col.type),
        gridFormat: col.format ?? this.getColumnFormat(col.type),
        hasCustomTemplate: this.hasCustomTemplate(col.type),
        alignment: col.alignment ?? this.getColumnAlignment(col.type)
      }));
    }
    if (columnsChanged) this.generateGridSummery(changes.columns.currentValue);
    const dataSourceChanged =
      changes.dataSource && changes.dataSource.currentValue !== changes.dataSource.previousValue;
    if (dataSourceChanged) this.summaryRendered = false;
    setTimeout(() => {
      this.dxDataGrid.instance.repaint();
    }, 500);
  }

  private flattenNestedColumns(): void {
    this.flattenColumns.clear();
    this.columns.forEach(t => {
      if (t.nestedColumns?.length) this.flattenColumns.push(...t.nestedColumns);
      const { nestedColumns, ...d } = t;
      this.flattenColumns.push(d);
    });
  }

  generateGridSummery(columns: Column[]): void {
    const shouldGenerateGridSummary = columns.any(r => r.summeryType !== undefined || r.summeryOperation !== undefined);
    if (!shouldGenerateGridSummary) return;
    this.summaries = columns
      .filter(r => r.summeryType || r.summeryOperation)
      .map(r => {
        return {
          name: r.name,
          summeryOperation: r.summeryOperation ?? 'sum',
          valueFormat:
            r.summeryType === SummeryType.Currency ? '#,##0.00' : r.summeryOperation === 'count' ? '' : '##0.##',
          format: r.summeryMessage
            ? Utils.GenerateSummeryMessage({ message: r.summeryMessage, summeryType: r.summeryType })
            : Utils.GenerateSummeryWithoutMessage(r.summeryType)
        };
      });
  }

  exportTable(exportType: 'Excel' | 'CSV'): void {
    const hasCustomColumns = this.hasCustom;
    const dataSource = this.dxDataGrid.instance.getCombinedFilter()
      ? this.dxDataGrid.instance.getDataSource().items()
      : this.dataSource;

    if (hasCustomColumns && exportType == 'Excel') {
      Utils.customExport<SafeAny>(this.dxDataGrid.instance, this.createFileName(this.exportName), exportType);
    } else {
      Utils.exportExcel<SafeAny>(
        DxFormatter.getFormattedDataSet(dataSource, this.dxDataGrid) as SafeAny[],
        this.createFileName(this.exportName),
        exportType,
        this.dxDataGrid.instance
          .getVisibleColumns()
          .filter(e => e.type === undefined && e.dataField)
          .map(r => r.caption),
        !hasCustomColumns
          ? this.columns.filter(d => d.dataField).map(r => ({ dataField: r.dataField, type: r.type }))
          : this.columns.map(r => ({ dataField: r.dataField, type: r.type })),
        hasCustomColumns,
        this.dxDataGrid.instance.getVisibleColumns()
      );
    }
  }

  onButtonsGroupClick(id: number, func: (id: number | string) => void): void {
    func(id);
  }

  createFileName(name: string): string {
    const today = new Date();
    return `${name}_${today.getMonth() + 1}_${today.getFullYear()}`;
  }


  onContentReady(e: { component: { element: () => HTMLElement } }): void {
    if (this.showSummary) this.addTableSummary(e);
  }

  addTableSummary(e: { component: { element: () => HTMLElement } }): void {
    if (this.summaryRendered) return;
    var { summaryNumbers, summaryRow } = this.extractSummery(e);
    if (!summaryNumbers.length) return;
    this.reFormatSummary(summaryNumbers, summaryRow);
    this.summaryRendered = true;
  }
  private extractSummery(e: { component: { element: () => HTMLElement } }): {
    summaryNumbers: number[];
    summaryRow: HTMLTableRowElement;
  } {
    const tables = e.component.element().getElementsByClassName('dx-datagrid-table');
    let summaryRow = tables[tables.length - 1].getElementsByTagName('tr')[0];
    const summaryElements = Array.from(summaryRow.children)
      .filter(r => r.textContent)
      .map(r => r.textContent.split(' '));

    const summaryNumbers = summaryElements.flatten().filterNumbers();

    return { summaryNumbers, summaryRow };
  }

  private reFormatSummary(summaryNumbers: number[], summaryRow: HTMLTableRowElement): void {
    const summeryFormat: Array<{ summeryFormat: string; summeryNumbers: string }> =
      this.dxDataGrid.summary.totalItems.map((r, index) => {
        return {
          summeryFormat: r.displayFormat,
          summeryNumbers: (Math.round(+summaryNumbers[index] * 100) / 100).toFixed(2).replace('.00', '')
        };
      });
    summaryRow.innerHTML = this.dataGridService.createSummeryBar(summeryFormat).innerHTML;
  }

  onRowClick(evt: {
    key: string | number;
    component: { selectRows: (keys: Array<string | number>, select: boolean) => void };
  }): void {
    this.rowSelected.emit(evt.key);
    this.selectedValue = evt.key;
    this.isRowSelection = false;
    evt.component.selectRows([evt.key], false);
  }

  onSelectionChanged($event): void {
    if (!this.isRowSelection) {
      $event.currentSelectedRowKeys.forEach(key => {
        $event.component.byKey(key).done(item => {
          $event.component.deselectRows(key);
          this.isRowSelection = true;
        });
      });
    }
    this.rowsSelected.emit(this.dxDataGrid.instance.getSelectedRowsData());
  }

  onCellClick(evt: SafeAny): void {
    this.cellClicked.emit(evt);
  }

  onRowUpdating(evt: SafeAny): void {
    this.rowUpdating.emit(evt);
  }

  // TODO:: calling method inside html is marked as bad practice and we need to find a better solution for it
  getColumn(dataField: string): Column {
    return this.flattenColumns.find(r => r.dataField === dataField);
  }
}
