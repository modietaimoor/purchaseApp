/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Body } from '@core/async-services/http/decorator/parameters';
import { GET, POST } from '@core/async-services/http/decorator/request-methods';
import { RestClient } from '@core/async-services/http/rest-client';
import { ProductsGridModelResponse } from '@domain/resquest-response/response/products-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsRepository extends RestClient {
  @POST('Products/SaveProduct')
  SaveProduct(@Body product: FormData): Observable<void> {
    return null;
  }

  @GET('Products/GetAllProducts')
  GetAllProducts(): Observable<ProductsGridModelResponse[]> {
    return null;
  }

  @POST('Products/DeleteProducts')
  DeleteProducts(@Body productIDs: number[]): Observable<void> {
    return null;
  }
}
