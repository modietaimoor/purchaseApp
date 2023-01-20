import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync, flush } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { DxoGridModule } from 'devextreme-angular/ui/nested';

import { DataGridSummeryComponent } from './data-grid-summery/data-grid-summery.component';
import { DataGridComponent } from './data-grid-server-side.component';
import * as Utils from '../grid.utils';
import { Column, DataSourceSteamResult, SummeryType } from '../model';
import { ButtonIconDirective } from 'src/app/shared/directives/button-icon/button-icon.directive';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
export interface TableData {
  id: number;
  username: string;
  sumRentalCost: string;
  sumMinutes: string;
}
@Component({
  template: `
    <div>
      <app-data-grid-server-side
        [source$]="source$"
        [exportDataSource$]="exportDataSource$"
        [columns]="columns"
        (pageChange)="onPageChange($event)"
        (export)="onExport()"
      ></app-data-grid-server-side>
    </div>
  `
})
export class TestDataGridComponent {
  source = new Subject<DataSourceSteamResult<TableData>>();
  source$ = this.source.asObservable();
  exportDataSource = new Subject<TableData[]>();
  exportDataSource$ = this.exportDataSource.asObservable();
  columns: Column[] = [
    { dataField: 'username', name: 'Username', summeryMessage: null },
    {
      dataField: 'sumRentalCost',
      name: 'Rental',
      summeryMessage: 'Rental',
      type: 'currency',
      summeryType: SummeryType.Currency
    },
    {
      dataField: 'sumMinutes',
      name: 'Minutes',
      summeryMessage: 'Total Minutes',
      summeryType: SummeryType.Minute
    }
  ];

  onPageChange = jasmine.createSpy('onPageChange');
  onExport = jasmine.createSpy('onExport');
}
let spectator: Spectator<TestDataGridComponent>;
let dxGridComponent: DxDataGridComponent;
let dataGridComponent: DataGridComponent<TableData>;

// Done - data
// Done - column names
// Done - total count
// Done - pager
// Done - filter
// By-default - sort
// Done - summery
describe('DataGridComponent', () => {
  const createComponent = createComponentFactory({
    component: TestDataGridComponent,
    declarations: [DataGridComponent, DataGridSummeryComponent, ButtonComponent, ButtonIconDirective],
    imports: [DxDataGridModule, DxoGridModule, CommonModule]
  });

  beforeEach(fakeAsync(() => {
    // Arrange
    spectator = createComponent();
    dxGridComponent = spectator.query(DxDataGridComponent);
    dataGridComponent = spectator.query<DataGridComponent<TableData>>(DataGridComponent);

    // Act
    dataGridComponent.refresh();
    spectator.detectChanges();
    flush();

    spectator.component.source.next({
      data: {
        data: [{ id: 1, sumMinutes: '100', sumRentalCost: '200', username: 'Admin' }],
        summary: [1000, 2000, 3000],
        totalCount: 500
      }
    });

    flush();
  }));

  it('it should have correct total number', () => {
    expect(dxGridComponent.instance.totalCount()).toBe(500);
  });

  it('it should list all the data', () => {
    expect(dxGridComponent.instance.getDataSource().items()[0]).toEqual({
      id: 1,
      sumMinutes: '100',
      sumRentalCost: '200',
      username: 'Admin'
    });
  });

  it('it should show correct column names', () => {
    dxGridComponent.instance
      .getVisibleColumns()
      .map(t => t.caption)
      .forEach(c => expect(spectator.component.columns.map(col => col.name)).toContain(c));
  });

  it('it should enable pagination', () => {
    expect(dxGridComponent.pager.visible).toEqual('true');
    expect(dxGridComponent.pager.allowedPageSizes).toEqual([5, 10, 20, 50]);
    expect(dxGridComponent.pager.displayMode).toEqual('full');
    expect(dxGridComponent.pager.showPageSizeSelector).toEqual(true);
    expect(dxGridComponent.pager.showInfo).toEqual(true);
  });

  it('it should enable row filtration', () => {
    expect(dxGridComponent.filterRow.visible).toEqual(true);
  });

  it('it should show summery', () => {
    expect(dxGridComponent.summary.totalItems.length).toEqual(2);
    const summeryItems = spectator.queryAll(byTestId('summery-item'));
    expect(summeryItems.length).toBe(2);
    expect(summeryItems[0]).toHaveText('Rental: £ 1000');
    expect(summeryItems[1]).toHaveText('Total Minutes: 2000 Min');
  });

  it('it should show error when source throw error', fakeAsync(() => {
    // Act
    dataGridComponent.refresh();
    spectator.detectChanges();
    spectator.component.source.next({ error: '' });
    flush();
    // Assert
    expect(dxGridComponent.errorRowEnabled).toBeTrue();
  }));

  it('it should export csv', fakeAsync(() => {
    // Arrange
    const spy = spyOnProperty(Utils, 'exportExcel', 'get').and.returnValue(() => {});
    spectator.debugElement.query(By.css('[data-testid="export-to-csv"]')).triggerEventHandler('clickEvent', '');
    const data = [{ id: 1, sumMinutes: '100', sumRentalCost: '200', username: 'Admin' }];

    // Act
    spectator.component.exportDataSource.next(data);

    flush();

    // Arrange
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('it should export excel', fakeAsync(() => {
    // Arrange
    const spy = spyOnProperty(Utils, 'exportExcel', 'get').and.returnValue(() => {});
    spectator.debugElement.query(By.css('[data-testid="export-to-excel"]')).triggerEventHandler('clickEvent', '');
    const data = [{ id: 1, sumMinutes: '100', sumRentalCost: '200', username: 'Admin' }];

    // Act
    spectator.component.exportDataSource.next(data);

    flush();

    // Arrange
    expect(spy).toHaveBeenCalledTimes(1);
  }));
});
