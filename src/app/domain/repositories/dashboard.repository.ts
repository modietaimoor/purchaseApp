/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Query } from '@core/async-services/http/decorator/parameters';
import { GET } from '@core/async-services/http/decorator/request-methods';
import { RestClient } from '@core/async-services/http/rest-client';
import { SalesByCategoryResponse, DailySalesResponse, MonthlySalesResponse, YearlySalesResponse } from '@domain/resquest-response/response/dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardRepository extends RestClient {
  @GET('Dashboard/GetDailySales')
  GetDailySales(@Query('reportDate') reportDate: string): Observable<DailySalesResponse[]> {
    return null;
  }

  @GET('Dashboard/GetDailySalesByCategory')
  GetDailySalesByCategory(@Query('reportDate') reportDate: string): Observable<SalesByCategoryResponse[]> {
    return null;
  }

  @GET('Dashboard/GetMonthlySales')
  GetMonthlySales(@Query('reportDate') reportDate: string): Observable<MonthlySalesResponse[]> {
    return null;
  }

  @GET('Dashboard/GetMonthlySalesByCategory')
  GetMonthlySalesByCategory(@Query('reportDate') reportDate: string): Observable<SalesByCategoryResponse[]> {
    return null;
  }

  @GET('Dashboard/GetYearlySales')
  GetYearlySales(@Query('reportDate') reportDate: string): Observable<YearlySalesResponse[]> {
    return null;
  }

  @GET('Dashboard/GetYearlySalesByCategory')
  GetYearlySalesByCategory(@Query('reportDate') reportDate: string): Observable<SalesByCategoryResponse[]> {
    return null;
  }
}
