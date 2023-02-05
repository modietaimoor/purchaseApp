/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Query } from '@core/async-services/http/decorator/parameters';
import { GET } from '@core/async-services/http/decorator/request-methods';
import { RestClient } from '@core/async-services/http/rest-client';
import { SpecFieldsResponse } from '@domain/resquest-response/response/specfields-response';

@Injectable({
  providedIn: 'root'
})
export class SpecificationFieldsRepository extends RestClient {
  @GET('SpecificationFields/GetAllSpecFields')
  GetAllSpecFields(): Observable<SpecFieldsResponse[]> {
    return null;
  }

  @GET('SpecificationFields/AddSpecField')
  AddSpecField(@Query('name') name: string, @Query('type') type: string): Observable<void> {
    return null;
  }

  @GET('SpecificationFields/DeleteSpecField')
  DeleteSpecField(@Query('id') id: number): Observable<void> {
    return null;
  }

  @GET('SpecificationFields/UpdateSpecFieldName')
  UpdateSpecFieldName(@Query('id') id: number, @Query('name') name: string): Observable<void> {
    return null;
  }
}
