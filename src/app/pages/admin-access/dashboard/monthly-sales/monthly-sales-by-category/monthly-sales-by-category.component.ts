import { Component, Input, OnInit } from '@angular/core';
import { SafeAny } from '@core/safe-any-type';
import { InfoLabelType, SalesByCategoryModel, SalesModel } from '@domain/models/dashboard';
import { GetMonthlySalesByCategoryUsecase } from '@domain/repositories/usecases/dashboard/get-monthly-sales-by-category.usecase';
import { ChartSeries } from '@shared/components/chart/chart-series';

@Component({
  selector: 'app-monthly-sales-by-category',
  templateUrl: './monthly-sales-by-category.component.html'
})
export class MonthlySalesByCategoryComponent implements OnInit {
  @Input() monthData: SalesModel;
  loadingVisible = false;
  size = { width: '100%', height: '100%' };
  dataSource: SalesByCategoryModel[];
  @Input() title = 'Monthly Sales By Category';
  seriesList: Array<ChartSeries> = [
    {
      valueField: 'ordersCost',
      argumentField: 'categoryName'
    }
  ];
  labelType = InfoLabelType.Month;
  cost: number;
  count: number;
  
  constructor(private _getMonthlySalesByCategoryUseCase: GetMonthlySalesByCategoryUsecase) {}

  ngOnInit(): void {
    if(this.monthData.reportDate){
      this.loadingVisible = true;
      this._getMonthlySalesByCategoryUseCase.execute(this.monthData.reportDate).subscribe(x => {
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
