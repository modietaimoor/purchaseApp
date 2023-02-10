import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrdersRepository } from '@domain/repositories/orders.repository';
import { Order, OrdersList } from '@domain/models/orders';
import { map } from 'rxjs/operators';
import { GridFilterGroup, Sort } from '@shared/components/grid/model';

@Injectable({
  providedIn: 'root'
})
export class GetOrdersListUsecase {
  constructor(private _ordersRepository: OrdersRepository) {}

  execute(requireTotalCount: boolean, skip: number, take: number, sort: Sort[], filter: unknown, group?: GridFilterGroup[]): Observable<OrdersList> {
    return this._ordersRepository.GetOrdersList(requireTotalCount ? 'true' : 'false', skip, take, sort, filter, group).pipe(
      map(res => {
        return {
          data: group
            ? res.data.map(d => ({ key: d.key, count: d.count } as Order))
            : res.data.map(r => {
              return {
                orderID: r.OrderID,
                userID: r.UserID,
                username: r.Username,
                phoneNumber: r.PhoneNumber,
                email: r.Email,
                isMale: r.IsMale,
                orderDate: r.OrderDate,
                orderTime: r.OrderDate,
                statusID: r.StatusID,
                statusName: r.StatusName,
                orderCost: r.OrderCost
              }
            }),
          totalCount: res.totalCount,
          summary: []
        };
      })
    );
  }
}
