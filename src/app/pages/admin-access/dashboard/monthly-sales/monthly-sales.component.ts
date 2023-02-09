import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SafeAny, SafeObjectAny } from '@core/safe-any-type';
import { SalesModel } from '@domain/models/dashboard';
import { GetMonthlySalesUsecase } from '@domain/repositories/usecases/dashboard/get-monthly-sales.usecase';
import { ChartSeries } from '@shared/components/chart/chart-series';
import { FormatValueAxisColumn } from '@shared/components/chart/chart.utils';
import { ModalService } from '@shared/components/modal/modal.service';
import { MonthlySalesByCategoryComponent } from './monthly-sales-by-category/monthly-sales-by-category.component';

@Component({
  selector: 'app-monthly-sales',
  templateUrl: './monthly-sales.component.html'
})
export class MonthlySalesComponent implements OnChanges {
  customizeYAxisText = (e: SafeAny): string => {
    return e.valueText === '0' ? '' : FormatValueAxisColumn(e.value as number);
  }
  customizeTooltip = (e: SafeObjectAny): SafeAny => {
    let data = e.point.data;
    let tipText = 'Month: ' + (data.reportDate as Date).toMonthNameYear() + '\n'
    + 'Sales: EGP ' + data.ordersCost.toLocaleString('en-US') + '\n'
    + '# Orders: ' + data.ordersCount.toLocaleString('en-US') + '\n'
    + '# Products: ' + data.ordersItemsCount.toLocaleString('en-US') + '\n';
    return { text: tipText };
  }
  @Input() reportDate: Date;
  loadingVisible = false;
  size = { width: '100%', height: '100%' };
  dataSource: SalesModel[];
  title = 'Monthly Sales (EGP)';
  seriesList: Array<ChartSeries> = [
    {
      valueField: 'ordersCost',
      type: 'Bar',
      argumentField: 'reportDate',
      name: 'Month Sales'
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
  constructor(private _getMonthlySalesUseCase: GetMonthlySalesUsecase,
    private _modalService: ModalService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.reportDate = changes.reportDate.currentValue;
    if(this.reportDate){
      this.loadingVisible = true;
      this._getMonthlySalesUseCase.execute(this.reportDate).subscribe(x => {
        this.dataSource = x;
        this.loadingVisible = false;
      });
    }
  }

  pointClicked = (e: { target : { data: SalesModel } }): void => {
    this._modalService.create<MonthlySalesByCategoryComponent>({
      content: MonthlySalesByCategoryComponent,
      title: 'Monthly Sales By Category (' + e.target.data.reportDate.toMonthNameYear() + ')',
      showConfirmButton: false,
      height: 500,
      width: 50,
      componentParams: {
        monthData: e.target.data
      }
    });
  }
}
