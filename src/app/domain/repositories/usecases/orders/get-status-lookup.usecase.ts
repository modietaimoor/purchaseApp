import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrdersRepository } from '@domain/repositories/orders.repository';
import { map } from 'rxjs/operators';
import { StatusModel } from '@domain/models/orders';

@Injectable({
  providedIn: 'root'
})
export class GetStatusLookupUsecase {
  constructor(private _ordersRepository: OrdersRepository) {}

  execute(): Observable<StatusModel[]> {
    return this._ordersRepository.GetStatusLookup().pipe(map(res =>
        res.map(x => {
            return {
                statusID: x.StatusID,
                statusName: x.StatusName
            };
        })
    ));
  }
}
