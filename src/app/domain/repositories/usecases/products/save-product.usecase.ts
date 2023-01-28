import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsRepository } from '@domain/repositories/products.repository';
import { ProductModelRequest } from '@domain/resquest-response/request/products-request';

@Injectable({
  providedIn: 'root'
})
export class SaveProductUsecase {
  constructor(private _productsRepository: ProductsRepository) {}

  execute(product: ProductModelRequest): Observable<void> {
    return this._productsRepository.SaveProduct(product);
  }
}
