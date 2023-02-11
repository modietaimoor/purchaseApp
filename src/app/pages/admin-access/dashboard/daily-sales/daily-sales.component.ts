import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SafeAny, SafeObjectAny } from '@core/safe-any-type';
import { SalesModel } from '@domain/models/dashboard';
import { GetDailySalesUsecase } from '@domain/repositories/usecases/dashboard/get-daily-sales.usecase';
import { ChartSeries } from '@shared/components/chart/chart-series';
import { FormatValueAxisColumn } from '@shared/components/chart/chart.utils';
import { ModalService } from '@shared/components/modal/modal.service';
import { DailySalesByCategoryComponent } from './daily-sales-by-category/daily-sales-by-category.component';

@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html'
})
export class DailySalesComponent implements OnChanges {
  customizeYAxisText = (e: SafeAny): string => {
    return e.valueText === '0' ? '' : FormatValueAxisColumn(e.value as number);
  }
  customizeTooltip = (e: SafeObjectAny): SafeAny => {
    let data = e.point.data;
    let tipText = 'Day: ' + (data.reportDate as Date).toDayMonthYear() + '\n'
    + 'Sales: EGP' + data.ordersCost.toLocaleString('en-US') + '\n'
    + '# Orders: ' + data.ordersCount.toLocaleString('en-US') + '\n'
    + '# Products: ' + data.ordersItemsCount.toLocaleString('en-US') + '\n';
    return { text: tipText };
  }
  @Input() reportDate: Date;
  loadingVisible = false;
  size = { width: '100%', height: '100%' };
  position = { of: '#dayChart' };
  dataSource: SalesModel[];
  title = 'Daily Sales (EGP)';
  seriesList: Array<ChartSeries> = [
    {
      valueField: 'ordersCost',
      type: 'Bar',
      argumentField: 'reportDate',
      name: 'Day Sales'
    }
  ];
  valueAxis = {
    label: {
      format: {
        type: 'currency',
        currency: 'EGP'
      }
    },
    showZero: false
  };
  constructor(private _getDailySalesUseCase: GetDailySalesUsecase,
    private _modalService: ModalService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.reportDate = changes.reportDate.currentValue;
    if(this.reportDate){
      this.loadingVisible = true;
      this._getDailySalesUseCase.execute(this.reportDate).subscribe(x => {
        this.dataSource = x;
        this.loadingVisible = false;      
      });
    }
  }

  pointClicked = (e: { target : { data: SalesModel } }): void => {
    this._modalService.create<DailySalesByCategoryComponent>({
      content: DailySalesByCategoryComponent,
      title: 'Daily Sales By Category (' + e.target.data.reportDate.toDayMonthYear() + ')',
      showConfirmButton: false,
      height: 500,
      width: 50,
      componentParams: {
        dayData: e.target.data
      }
    });
  }
}
