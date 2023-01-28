import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrdersRepository } from '@domain/repositories/orders.repository';

@Injectable({
  providedIn: 'root'
})
export class AddNewOrderUsecase {
  constructor(private _ordersRepository: OrdersRepository) {}

  execute(template: CompanyRentalOverdueTemplate): Observable<number> {
    return this._ordersRepository.AddNewOrder(template);
  }
}
