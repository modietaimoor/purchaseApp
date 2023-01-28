/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Query, Body } from '@core/async-services/http/decorator/parameters';
import { GET, POST } from '@core/async-services/http/decorator/request-methods';
import { RestClient } from '@core/async-services/http/rest-client';
import { Category } from '@domain/resquest-response/response/categories-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepository extends RestClient {
  @GET('Categories/GetAllCategories')
  GetAllCategories(): Observable<Category> {
    return null;
  }

  @GET('Categories/AddNewCategory')
  AddNewCategory(@Query('categoryName') categoryName: string, @Query('parentID') parentID?: number): Observable<void> {
    return null;
  }

  @POST('Categories/DeleteCategorySpecFields')
  DeleteCategorySpecFields(@Body specIDs: number[]): Observable<void> {
    return null;
  }

  @GET('Categories/AddCategorySpecField')
  AddCategorySpecField(@Query('categoryID') categoryID: number, 
  @Query('fieldName') fieldName: string,
  @Query('fieldType') fieldType: string,
  @Query('isMandatory') isMandatory: boolean): Observable<void> {
    return null;
  }
}
