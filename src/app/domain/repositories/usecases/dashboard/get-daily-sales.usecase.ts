import { Injectable } from '@angular/core';
import { DashboardRepository } from '@domain/repositories/dashboard.repository';
import { Observable } from 'rxjs';

import { SalesModel } from '@domain/models/dashboard'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDailySalesUsecase {
  constructor(private _dashboardRepository: DashboardRepository) {}

  execute(reportDate: Date): Observable<SalesModel[]> {
    return this._dashboardRepository.GetDailySales(reportDate.toYearMonthDay()).pipe(map(res =>
        res.map(x => {
            return {
              reportDate: x.ReportDay,
              statusID: x.StatusID,
              ordersCost: x.OrdersCost,
              ordersItemsCount: x.OrdersItems,
              ordersCount: x.OrdersCount
            };
          })
    ));
  }
}
