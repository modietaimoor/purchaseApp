/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Query, Body } from '@core/async-services/http/decorator/parameters';
import { GET, POST } from '@core/async-services/http/decorator/request-methods';
import { RestClient } from '@core/async-services/http/rest-client';
import { OrderContentResponse, OrderResponse, StatusModelResponse } from '@domain/resquest-response/response/orders-response';
import { BulkChangeStatusRequest } from '@domain/resquest-response/request/orders-request';

@Injectable({
  providedIn: 'root'
})
export class OrdersRepository extends RestClient {
  @GET('Orders/GetOrdersList')
  GetOrdersList(): Observable<OrderResponse[]> {
    return null;
  }

  @GET('Orders/GetStatusLookup')
  GetStatusLookup(): Observable<StatusModelResponse[]> {
    return null;
  }

  @GET('Orders/GetOrderContent')
  GetOrderContent(@Query('orderID') orderID: number): Observable<OrderContentResponse[]> {
    return null;
  }

  @GET('Orders/ChangeOrderStatus')
  ChangeOrderStatus(@Query('orderID') orderID: number, @Query('statusID') statusID: number): Observable<void> {
    return null;
  }

  @POST('Orders/AddNewOrder')
  AddNewOrder(@Body companyId: number): Observable<void> {
    return null;
  }

  @POST('Orders/BulkChangeOrderStatus')
  BulkChangeOrderStatus(@Body bulkChangeStatusRequest: BulkChangeStatusRequest): Observable<void> {
    return null;
  }
}
