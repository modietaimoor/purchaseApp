import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsRepository } from '@domain/repositories/products.repository';

@Injectable({
  providedIn: 'root'
})
export class SaveProductUsecase {
  constructor(private _productsRepository: ProductsRepository) {}

  execute(product: FormData): Observable<void> {
    return this._productsRepository.SaveProduct(product);
  }
}
