import { Component, Input, OnInit } from '@angular/core';
import { SafeAny } from '@core/safe-any-type';
import { InfoLabelType, SalesByCategoryModel, SalesModel } from '@domain/models/dashboard';
import { GetDailySalesByCategoryUsecase } from '@domain/repositories/usecases/dashboard/get-daily-sales-by-category.usecase';
import { ChartSeries } from '@shared/components/chart/chart-series';

@Component({
  selector: 'app-daily-sales-by-category',
  templateUrl: './daily-sales-by-category.component.html'
})
export class DailySalesByCategoryComponent implements OnInit {
  @Input() dayData: SalesModel;
  loadingVisible = false;
  size = { width: '100%', height: '100%' };
  dataSource: SalesByCategoryModel[];
  @Input() title = 'Daily Sales By Category';
  seriesList: Array<ChartSeries> = [
    {
      valueField: 'ordersCost',
      argumentField: 'categoryName'
    }
  ];
  labelType = InfoLabelType.Day;
  cost: number;
  count: number;
  
  constructor(private _getDailySalesByCategoryUseCase: GetDailySalesByCategoryUsecase) {}

  ngOnInit(): void {
    if(this.dayData.reportDate){
      this.loadingVisible = true;
      this._getDailySalesByCategoryUseCase.execute(this.dayData.reportDate).subscribe(x => {
        this.dataSource = x;
        this.setCostAndCount();
        this.loadingVisible = false;
      });
    }
  }

  setCostAndCount(): void {
    this.cost = 0;
    this.count = 0;
    this.dataSource.forEach(x => {
      this.cost+= x.ordersCost;
      this.count+= x.ordersItemsCount;
    });
  }

  customizeCategoryLabel = (e: SafeAny): string => {    
    return e.argumentText + '(' + e.percentText + ')';
  }

  customizeCategoryTooltip = (e: { point: { data: SalesByCategoryModel } }): SafeAny => {
    return { text :'Sales: EGP' + e.point.data.ordersCost.toLocaleString('en-US') + '\n'
    + '# Products: ' + e.point.data.ordersItemsCount.toLocaleString('en-US') + '\n' };
  }
}