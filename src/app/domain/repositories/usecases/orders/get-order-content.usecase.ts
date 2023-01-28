import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrdersRepository } from '@domain/repositories/orders.repository';
import { OrderItems } from '@domain/models/orders';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetOrderContentUsecase {
  constructor(private _ordersRepository: OrdersRepository) {}

  execute(orderID: number): Observable<OrderItems[]> {
    return this._ordersRepository.GetOrderContent(orderID).pipe(map(res =>
            res.map(x => {
                return {
                    orderID: x.OrderID,
                    productID: x.ProductID,
                    categoryID: x.CategoryID,
                    categoryName: x.CategoryName,
                    isByWeight: x.IsByWeight,
                    productName: x.ProductName,
                    productPrice: x.ProductPrice,
                    totalPrice: x.Quantity * x.ProductPrice,
                    quantity: x.Quantity
                };
            })        
        ));
  }
}
