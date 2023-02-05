import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsRepository } from '@domain/repositories/products.repository';
import { map } from 'rxjs/operators';
import { ProductGridModel } from '@domain/models/products';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryProductsUsecase {
  constructor(private _productsRepository: ProductsRepository) {}

  execute(categoryID: number): Observable<ProductGridModel[]> {
    return this._productsRepository.GetCategoryProducts(categoryID).pipe(map(res =>
        res.map(x => {
            return {
              productID: x.ProductID,
              creationDate: x.CreationDate,
              productName: x.ProductName,
              categoryID: x.CategoryID,
              categoryName: x.CategoryName,
              productPrice: x.ProductPrice,
              isByWeight: x.IsByWeight     
            };
          })
    ));
  }
}
