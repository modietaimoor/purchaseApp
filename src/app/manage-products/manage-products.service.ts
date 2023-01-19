import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppSettings } from '../core/services/app.settings.service';

@Injectable()
export class ManageProductService {

  private backendUrl = AppSettings.configuration.api.baseUrl;  // URL to web api

  constructor(private _http: HttpClient) { }

  public getAllSizes(): Observable<any> {
    return this._http.get<any>(this.backendUrl + "sizes/GetAllSizes");
  }

  public getAllCategories(): Observable<any> {
    return this._http.get<any>(this.backendUrl + "categories/GetAllCategories");
  }

  public getAllProducts(): Observable<any> {
    return this._http.get<any>(this.backendUrl + "products/GetAllProducts");
  }

  public getProductsPhotos(): Observable<any> {
    return this._http.get<any>(this.backendUrl + "products/GetProductsPhotos");
  }

  public saveProduct(product: any, prodPhoto: any): Observable<any> {
    var formData = new FormData();
    formData.append('productModel', JSON.stringify(product));
    formData.append("file_upload", prodPhoto);
    let headers = new HttpHeaders();
    headers.append("Content-Type", '');
    return this._http.post<any>(this.backendUrl + "products/SaveProduct", formData, { 'headers': headers });
  }

  public updateProduct(product: any, prodPhoto: any): Observable<any> {
    var formData = new FormData();
    formData.append('productModel', JSON.stringify(product));
    formData.append("file_upload", prodPhoto);
    let headers = new HttpHeaders();
    headers.append("Content-Type", '');
    return this._http.post<any>(this.backendUrl + "products/UpdateProduct", formData, { 'headers': headers });
  }

  public deleteProducts(productIDs: number[]): Observable<any> {
    return this._http.post<any>(this.backendUrl + "products/DeleteProducts",  productIDs);
  }

  public productCodeExists(productCode: string): Observable<any> {
    return this._http.get<any>(this.backendUrl + "products/ProductCodeExists?productCode=" + productCode);
  }
}
