import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriesRepository } from '@domain/repositories/categories.repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteCategoryUsecase {
  constructor(private _categoriesRepository: CategoriesRepository) {}

  execute(categoryID: number): Observable<void> {
    return this._categoriesRepository.DeleteCategory(categoryID);
  }
}
