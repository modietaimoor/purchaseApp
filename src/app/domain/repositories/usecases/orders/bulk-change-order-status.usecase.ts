import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BulkChangeStatusRequest } from '@domain/resquest-response/request/orders-request';
import { OrdersRepository } from '@domain/repositories/orders.repository';

@Injectable({
  providedIn: 'root'
})
export class BulkChangeOrderStatusUsecase {
  constructor(private _ordersRepository: OrdersRepository) {}

  execute(bulkChangeStatusRequest: BulkChangeStatusRequest): Observable<void> {
    return this._ordersRepository.BulkChangeOrderStatus(bulkChangeStatusRequest).pipe();
  }
}
