import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersRepository } from '@domain/repositories/orders.repository';

@Injectable({
  providedIn: 'root'
})
export class ChangeOrderStatusUsecase {
  constructor(private _ordersRepository: OrdersRepository) {}

  execute(orderID: number, statusID: number): Observable<void> {
    return this._ordersRepository.ChangeOrderStatus(orderID, statusID).pipe();
  }
}
