/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Query } from '@core/async-services/http/decorator/parameters';
import { GET } from '@core/async-services/http/decorator/request-methods';
import { RestClient } from '@core/async-services/http/rest-client';
import { CategoryResponse } from '@domain/resquest-response/response/categories-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepository extends RestClient {
  @GET('Categories/GetAllCategories')
  GetAllCategories(): Observable<CategoryResponse[]> {
    return null;
  }

  @GET('Categories/AddNewCategory')
  AddNewCategory(@Query('categoryName') categoryName: string, @Query('parentID') parentID?: number): Observable<void> {
    return null;
  }

  @GET('Categories/DeleteCategory')
  DeleteCategory(@Query('categoryID') categoryID: number): Observable<void> {
    return null;
  }

  @GET('Categories/UpdateCategoryName')
  UpdateCategoryName(@Query('categoryID') categoryID: number, @Query('name') name: string): Observable<void> {
    return null;
  }

  @GET('Categories/GetCategoryChildren')
  GetCategoryChildren(@Query('categoryID') categoryID: number): Observable<CategoryResponse[]> {
    return null;
  }

  @GET('Categories/GetAncestorCategories')
  GetAncestorCategories(): Observable<CategoryResponse[]> {
    return null;
  }
}
