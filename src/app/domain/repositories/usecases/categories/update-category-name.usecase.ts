import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesRepository } from '@domain/repositories/categories.repository';

@Injectable({
  providedIn: 'root'
})
export class UpdateCategoryNameUsecase {
  constructor(private _categoriesRepository: CategoriesRepository) {}

  execute(categoryID: number, name: string): Observable<void> {
    return this._categoriesRepository.UpdateCategoryName(categoryID, name);
  }
}
