import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppSettings } from '../core/services/app.settings.service';
import { BulkChangeStatusRequest, OrderItemsResponse, OrderResponse, StatusModelResponse } from '../domain/resquest-response/request-response';

@Injectable()
export class OrdersService {

  private backendUrl = AppSettings.configuration.api.baseUrl;  // URL to web api

  constructor(private _http: HttpClient) { }

  public getStatusLookup(): Observable<StatusModelResponse[]> {
    return this._http.get<any>(this.backendUrl + "orders/GetStatusLookup");
  }
  
  public getOrdersList(): Observable<OrderResponse[]> {
    return this._http.get<any>(this.backendUrl + "orders/GetOrdersList");
  }

  public getOrderContent(orderID: number): Observable<OrderItemsResponse[]> {
    return this._http.get<any>(this.backendUrl + "orders/GetOrderContent?orderID=" + orderID);
  }

  public addNewOrder(orderModel: OrderResponse): Observable<any> {
    return this._http.post<any>(this.backendUrl + "orders/AddNewOrder", orderModel);
  }

  public changeOrderStatus(orderID: number, statusID: number): Observable<any> {
    return this._http.get<any>(this.backendUrl + "orders/ChangeOrderStatus?orderID=" + orderID + "&statusID=" + statusID);
  }

  public bulkChangeOrderStatus(orderModel: BulkChangeStatusRequest): Observable<any> {
    return this._http.post<any>(this.backendUrl + "orders/BulkChangeOrderStatus", orderModel);
  }
}
