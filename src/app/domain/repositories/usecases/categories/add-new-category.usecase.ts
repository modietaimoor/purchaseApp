import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesRepository } from '@domain/repositories/categories.repository';

@Injectable({
  providedIn: 'root'
})
export class AddNewCategoryUsecase {
  constructor(private _categoriesRepository: CategoriesRepository) {}

  execute(categoryName: string, parentID?: number): Observable<void> {
    return this._categoriesRepository.AddNewCategory(categoryName, parentID).pipe();
  }
}
