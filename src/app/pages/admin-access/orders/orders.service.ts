import { Injectable } from '@angular/core';

import { GetStatusLookupUsecase } from "@domain/repositories/usecases/orders/get-status-lookup.usecase";
import { GetOrdersListUsecase } from "@domain/repositories/usecases/orders/get-orders-list.usecase";
import { GetOrderContentUsecase } from "@domain/repositories/usecases/orders/get-order-content.usecase";
import { BulkChangeOrderStatusUsecase } from "@domain/repositories/usecases/orders/bulk-change-order-status.usecase";
import { ChangeOrderStatusUsecase } from "@domain/repositories/usecases/orders/change-order-status.usecase";
import { OrderItems, OrdersList, StatusModel } from '@domain/models/orders';
import { Observable } from 'rxjs';
import { GridFilterGroup, Sort } from '@shared/components/grid/model';
import { BulkChangeStatusRequest } from '@domain/resquest-response/request/orders-request';
import { OrdersListResponse } from '@domain/resquest-response/response/orders-response';

@Injectable()
export class OrdersService {

  constructor(private _getStatusLookupUsecase: GetStatusLookupUsecase,
    private _getOrderContentUsecase: GetOrderContentUsecase,
    private _bulkChangeOrderStatusUsecase: BulkChangeOrderStatusUsecase,
    private _changeOrderStatusUsecase: ChangeOrderStatusUsecase,
    private _getOrdersListUsecase: GetOrdersListUsecase) { }

  
  public getOrdersList(requireTotalCount: boolean, skip: number, take: number, sort: Sort[], filter: unknown, group?: GridFilterGroup[]): Observable<OrdersListResponse> {
      return this._getOrdersListUsecase.execute(requireTotalCount, skip, take, sort, filter, group);
  }

  public getOrderContent(orderID: number): Observable<OrderItems[]> {
    return this._getOrderContentUsecase.execute(orderID);
  }

  public getStatusLookup(): Observable<StatusModel[]> {
    return this._getStatusLookupUsecase.execute();
  }

  public changeOrderStatus(orderID: number, statusID: number): Observable<void> {
    return this._changeOrderStatusUsecase.execute(orderID, statusID);
  }

  public bulkChangeOrderStatus(bulkChangeStatusRequest: BulkChangeStatusRequest): Observable<void> {
    return this._bulkChangeOrderStatusUsecase.execute(bulkChangeStatusRequest);
  }

}
