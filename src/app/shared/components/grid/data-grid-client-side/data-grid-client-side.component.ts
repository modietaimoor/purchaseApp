import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { DxDataGridComponent } from 'devextreme-angular';
import { SafeAny } from '@core/safe-any-type';

import { BaseGridComponent } from '../base-grid.component';
import { DataGridService } from '../data-grid.service';
import * as Utils from '../grid.utils';
import { Column, SummeryType } from '../model';
import { DxFormatter } from './dx-format-data-source';
import { ColumnComponent } from '../columns/column.component';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-data-grid-client-side',
  templateUrl: './data-grid-client-side.component.html',
  styleUrls: ['./data-grid-client-side.component.css']
})
export class DataGridClientSideComponent<T> extends BaseGridComponent implements OnChanges, AfterContentInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<unknown>;
  @ViewChild(DxDataGridComponent) readonly dxDataGrid: DxDataGridComponent;
  @Input() readonly key: string = '';
  @Input() readonly pageSize: number = 10;
  @Input() readonly dataSource: T[];
  @Input() columns: Column[];
  @Input() readonly exportName: string = 'file';
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
  @Output() readonly rowExpanded: EventEmitter<SafeAny> = new EventEmitter<SafeAny>();
  @ContentChildren(ColumnComponent)
  public columnsComponents!: QueryList<ColumnComponent>;
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
  summaryRendered = false;
  // TODO : find another way to stop reformating summary multiple times;

  constructor(private dataGridService: DataGridService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const columnsChanged = changes.columns && changes.columns.currentValue !== changes.columns.previousValue;
    if (columnsChanged) {
      this.flattenColumns = this.flattenNestedColumns(this.columns);
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
  }

  ngAfterContentInit(): void {
    this.columnsComponents.changes.pipe(startWith(true)).subscribe(() => {
      const columnsComponent = this.columnsComponents.toArray();

      if (columnsComponent.length < 1) return;
      this.columns = [];
      columnsComponent.forEach(col => this.columns.push(this.createColumn(col)));
      this.flattenColumns = this.flattenNestedColumns(this.columns);
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
    if(this.dxDataGrid.summary.totalItems){
      var summeryFormat: Array<{ summeryFormat: string; summeryNumbers: string }> =
      this.dxDataGrid.summary.totalItems.map((r, index) => {
        return {
          summeryFormat: r.displayFormat,
          summeryNumbers: (Math.round(+summaryNumbers[index] * 100) / 100).toFixed(2).replace('.00', '')
        };
      });
    summaryRow.innerHTML = this.dataGridService.createSummeryBar(summeryFormat).innerHTML;
    }
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

  onRowExpanded(evt: SafeAny): void {
    this.rowExpanded.emit(evt);
  }

  // TODO:: calling method inside html is marked as bad practice and we need to find a better solution for it
  getColumn(dataField: string): Column {
    return this.flattenColumns.find(r => r.dataField === dataField);
  }
}
