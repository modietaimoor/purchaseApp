import { Injectable } from '@angular/core';
import { DashboardRepository } from '@domain/repositories/dashboard.repository';
import { Observable } from 'rxjs';

import { SalesByCategoryModel } from '@domain/models/dashboard'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDailySalesByCategoryUsecase {
  constructor(private _dashboardRepository: DashboardRepository) {}

  execute(reportDate: Date): Observable<SalesByCategoryModel[]> {
    return this._dashboardRepository.GetDailySalesByCategory(reportDate.toYearMonthDay()).pipe(map(res =>
        res.map(x => {
            return {
              categoryName: x.AncestorName,
              categoryID: x.AncestorID,
              statusID: x.StatusID,
              ordersCost: x.OrdersCost,
              ordersItemsCount: x.OrdersItems,
              ordersCount: x.OrdersCount
            };
          })
    ));
  }
}
