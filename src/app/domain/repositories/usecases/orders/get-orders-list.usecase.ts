import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrdersRepository } from '@domain/repositories/orders.repository';
import { Order } from '@domain/models/orders';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetOrdersListUsecase {
  constructor(private _ordersRepository: OrdersRepository) {}

  execute(): Observable<Order[]> {
    return this._ordersRepository.GetOrdersList().pipe(map(res =>
            res.map(x => { 
                return {
                    orderID: x.OrderID,
                    userID: x.UserID,
                    username: x.Username,
                    phoneNumber: x.PhoneNumber,
                    email: x.Email,
                    isMale: x.IsMale,
                    orderDate: x.OrderDate,
                    orderTime: x.OrderDate,
                    statusID: x.StatusID,
                    statusName: x.StatusName,
                    orderCost: x.OrderCost
              }
            })
        ));
  }
}
