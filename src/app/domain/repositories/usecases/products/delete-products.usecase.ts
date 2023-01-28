import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsRepository } from '@domain/repositories/products.repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductsUsecase {
  constructor(private _productsRepository: ProductsRepository) {}

  execute(productIDs: number[]): Observable<void> {
    return this._productsRepository.DeleteProducts(productIDs).pipe();
  }
}
