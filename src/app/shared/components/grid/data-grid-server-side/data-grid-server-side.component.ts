import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

import { BaseGridComponent } from '../base-grid.component';
import { ColumnComponent } from '../columns/column.component';
import { DxFormatter } from '../data-grid-client-side/dx-format-data-source';
import { DataGridService } from '../data-grid.service';
import * as Utils from '../grid.utils';
import { GenerateSummeryMessage } from '../grid.utils';
import { Column, DataSource, DataSourceSteamResult, GridFilterGroup, LoadOptions, PageChange, Sort } from '../model';

@Component({
  selector: 'app-data-grid-server-side',
  templateUrl: './data-grid-server-side.component.html',
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridComponent<T> extends BaseGridComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  @ViewChild('gridContainer') grid: DxDataGridComponent;
  @Input() readonly key: string = '';
  @Input() readonly columnWidth: number;
  @Input() readonly pageSize: number = 10;
  @Input() columns: Column[] = [];
  @Input() readonly exportName: string = 'file';
  @Input() readonly exportDataSource$: Observable<T[]>;
  @Input() readonly showExport: boolean = true;
  @Input() readonly showAdd: boolean = false;
  @Input() readonly selectionMode: 'single' | 'multiple';
  @Input() readonly source$: Observable<DataSourceSteamResult<T>>;
  @Input() selectedRowsKeys = [];
  @Input() width: number;
  @Input() height: number;
  @Input() columnAutoWidth: boolean = false;
  @Output() readonly pageChange: EventEmitter<PageChange> = new EventEmitter();
  @Output() readonly export: EventEmitter<'Excel' | 'CSV'> = new EventEmitter();
  @Output() readonly add = new EventEmitter();
  summaries: Array<{ name: string; format: string }> = [];
  @ContentChildren(ColumnComponent)
  public columnsComponents!: QueryList<ColumnComponent>;

  selectedValue: string | number;

  exportType: 'CSV' | 'Excel';
  dataSource: CustomStore;
  flattenColumns: Column[] = [];

  remoteOperations = true;
  noDataTextEncoded = 'No Data';
  allowedPageSizes = [5, 10, 20, 50];
  showFilterRow = true;
  showPageSizeSelector = true;
  showInfo = true;
  subscription: Subscription;
  summeryNumbers: number[] = [];
  // Grid Appearance
  showBorders = true;
  rowAlternationEnabled = true;
  showRowLines = true;
  showColumnLines = true;
  showHeaderFilter = true;

  resolve: (value: DataSource<T> | PromiseLike<DataSource<T>>) => void;
  reject: (reason?: string) => void;

  constructor(private dataGridService: DataGridService) {
    super();
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

  ngOnInit(): void {
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isColumnsChanged = changes.columns && changes.columns.currentValue !== changes.columns.previousValue;
    if (isColumnsChanged) {
      this.flattenColumns = this.flattenNestedColumns(this.columns);
      this.columns.forEach(r => this.updateColumn(r));
      this.generateGridSummery(changes.columns.currentValue);
    }

    const exportDataSourceChanged =
      changes.exportDataSource$ && changes.exportDataSource$.currentValue !== changes.exportDataSource$.previousValue;
    if (exportDataSourceChanged)
      this.exportDataSource$.subscribe(data => {
        this.onExportDataSource(data);
      });
  }

  private updateColumn(r: Column): void {
    if (r.nestedColumns && r.nestedColumns.length) r.nestedColumns.forEach(d => this.updateColumn(d));
    this.updateColumnTemplateAndFormat(r);
  }

  private updateColumnTemplateAndFormat(r: Column): void {
    r.hasCustomTemplate = this.hasCustomTemplate(r.type);
    r.gridFormat = r.format ?? this.getColumnFormat(r.type);
    r.alignment = r.alignment ?? this.getColumnAlignment(r.type);
    r.gridType = this.getColumnGridType(r.type);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onExportDataSource<T>(data: T[]): void {
    Utils.exportExcel<T>(
      DxFormatter.getFormattedDataSet<T>(data, this.grid) as T[],
      this.createFileName(this.exportName),
      this.exportType,
      this.grid.instance
        .getVisibleColumns()
        .filter(e => e.type === undefined && e.dataField)
        .map(r => r.caption),
      this.columns.filter(d => d.dataField).map(r => ({ dataField: r.dataField, type: r.type }))
    );
  }

  createFileName(name: string): string {
    const today = new Date();
    return `${name}_${today.getMonth() + 1}_${today.getFullYear()}`;
  }

  generateGridSummery(columns: Column[]): void {
    this.summaries = columns
      .filter(r => r.summeryMessage)
      .map(r => {
        return {
          name: r.name,
          format: GenerateSummeryMessage({ message: r.summeryMessage, summeryType: r.summeryType })
        };
      });
  }

  initializeDataSource(): void {
    this.dataSource = new CustomStore({
      key: this.key,
      load: (loadOptions: never): Promise<DataSource<T>> => {
        return this.getData(loadOptions, this.grid.instance.getCombinedFilter())
          .then((data: DataSource<T>) => {
            return {
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary
            };
          })
          .catch(() => {
            throw 'Data Loading Error';
          });
      }
    });
  }

  getData(loadOptions: LoadOptions, filter: unknown[]): Promise<DataSource<T>> {
    const promise = new Promise<DataSource<T>>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.registerOnDataStream();
    });

    // select one of the column filters to filter the grid then click on the filter again should display all the data that's why we need to
    // avoid make the request with the filter
    const shouldFilter = loadOptions.group === null || (filter && filter[0] !== loadOptions.group[0].selector);

    this.pageChange.emit({
      skip: loadOptions.skip,
      take: loadOptions.take,
      sort: this.reFormatSort(loadOptions.sort),
      filter: shouldFilter ? this.reFormatFilter(filter) : null,
      group: loadOptions?.group ? (loadOptions.group as GridFilterGroup[]) : null
    });

    return promise;
  }

  registerOnDataStream(): void {
    if (this.subscription) this.subscription.unsubscribe();

    this.subscription = this.source$.pipe().subscribe(r => {
      if (r.error) this.onDataFailed(this.reject);
      else this.onDataSucceeded(this.resolve, r.data ?? { data: [], summary: [], totalCount: 0 });
    });
  }

  onDataSucceeded(resolve: (value: DataSource<T> | PromiseLike<DataSource<T>>) => void, r: DataSource<T>): void {
    resolve(r);
    this.summeryNumbers = r.summary;
  }

  onDataFailed(reject: (reason?: string) => void): void {
    reject();
  }

  reFormatSort(sort: Sort[]): Sort[] {
    if (!sort) return sort;

    const newSort = sort.map(r => {
      r.selector = this.replaceDataFieldByFilterName(r.selector) ?? r.selector;
      return r;
    });

    return newSort;
  }

  reFormatFilter(filter: unknown[]): unknown {
    if (!filter) return filter;

    // filter should be array of arrays to hold all table filters but when there is only one filter selected will get only one array
    // so better to deal with it directly
    const oneFilterExist = !Array.isArray(filter[0]);
    if (oneFilterExist) return this.replaceFilterName(filter);

    const newFilter = filter.map(r => (Array.isArray(r) ? this.replaceFilterName(r) : r));

    return newFilter;
  }

  replaceFilterName(filter: unknown[]): unknown[] {
    const filterName = this.replaceDataFieldByFilterName(filter[0] as string);
    filter[0] = filterName ?? filter[0];
    return filter;
  }

  replaceDataFieldByFilterName(dataField: string): string {
    return this.flattenColumns.find(col => col.dataField === dataField)?.filterName;
  }

  exportTable(exportType: 'Excel' | 'CSV'): void {
    this.export.emit(exportType);
    this.exportType = exportType;
  }

  addHandler(): void {
    this.add.emit();
  }

  onContentReady(e: { component: { element: () => HTMLElement } }): void {
    this.addTableSummary(e);
  }

  addTableSummary(e: { component: { element: () => HTMLElement } }): void {
    if (this.summeryNumbers.length < 1) return; // table has no data so we shouldn't handle table summery
    const tables = e.component.element().getElementsByClassName('dx-datagrid-table');
    let summaryRow = tables[tables.length - 1].getElementsByTagName('tr')[0];
    const summeryFormat: Array<{ summeryFormat: string; summeryNumbers: string }> = this.grid.summary.totalItems.map(
      (r, index) => {
        return {
          summeryFormat: r.displayFormat,
          summeryNumbers: (Math.round(+this.summeryNumbers[index] * 100) / 100).toFixed(2).replace('.00', '')
        };
      }
    );
    summaryRow.innerHTML = this.dataGridService.createSummeryBar(summeryFormat).innerHTML;
  }

  refresh(): void {
    if (this.grid) this.grid.instance.refresh();
  }

  onRowClick(row: {
    key: string | number;
    data: { id: string };
    component: { selectRows: (keys: Array<string | number>, select: boolean) => void };
  }): void {
    this.selectedRowsKeys.clear();
    this.selectedRowsKeys.push(row.data.id);
    this.selectedValue = row.key;
    row.component.selectRows([row.key], false);
  }
}
