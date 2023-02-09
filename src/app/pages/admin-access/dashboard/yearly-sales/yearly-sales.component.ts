import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SafeAny, SafeObjectAny } from '@core/safe-any-type';
import { SalesModel } from '@domain/models/dashboard';
import { GetYearlySalesUsecase } from '@domain/repositories/usecases/dashboard/get-yearly-sales.usecase';
import { ChartSeries } from '@shared/components/chart/chart-series';
import { FormatValueAxisColumn } from '@shared/components/chart/chart.utils';
import { ModalService } from '@shared/components/modal/modal.service';
import { YearlySalesByCategoryComponent } from './yearly-sales-by-category/yearly-sales-by-category.component';

@Component({
  selector: 'app-yearly-sales',
  templateUrl: './yearly-sales.component.html'
})
export class YearlySalesComponent implements OnChanges {
  customizeYAxisText = (e: SafeAny): string => {
    return e.valueText === '0' ? '' : FormatValueAxisColumn(e.value as number);
  }
  customizeTooltip = (e: SafeObjectAny): SafeAny => {
    let data = e.point.data;
    let tipText = 'Year: ' + (data.reportDate as Date).getFullYear() + '\n'
    + 'Sales: EGP ' + data.ordersCost.toLocaleString('en-US') + '\n'
    + '# Orders: ' + data.ordersCount.toLocaleString('en-US') + '\n'
    + '# Products: ' + data.ordersItemsCount.toLocaleString('en-US') + '\n';
    return { text: tipText };
  }
  @Input() reportDate: Date;
  loadingVisible = false;
  size = { width: '100%', height: '100%' };
  dataSource: SalesModel[];
  title = 'Yearly Sales (EGP)';
  seriesList: Array<ChartSeries> = [
    {
      valueField: 'ordersCost',
      type: 'Bar',
      argumentField: 'reportDate',
      name: 'Year Sales'
    }
  ];
  valueAxis = {
    label: {
      format: {
        type: 'currency',
        precision: 2,
        currency: 'EGP'
      }
    },
    showZero: false
  };
  constructor(private _getYearlySalesUseCase: GetYearlySalesUsecase,
    private _modalService: ModalService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.reportDate = changes.reportDate.currentValue;
    if(this.reportDate){
      this.loadingVisible = true;
      this._getYearlySalesUseCase.execute(this.reportDate).subscribe(x => {
        this.dataSource = x;
        this.loadingVisible = false;
      });
    }
  }

  pointClicked = (e: { target : { data: SalesModel } }): void => {
    this._modalService.create<YearlySalesByCategoryComponent>({
      content: YearlySalesByCategoryComponent,
      title: 'Yearly Sales By Category (' + e.target.data.reportDate.getFullYear() + ')',
      showConfirmButton: false,
      height: 500,
      width: 50,
      componentParams: {
        yearData: e.target.data
      }
    });
  }
}
