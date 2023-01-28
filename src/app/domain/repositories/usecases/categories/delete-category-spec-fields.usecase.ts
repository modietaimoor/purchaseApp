import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriesRepository } from '@domain/repositories/categories.repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteCategorySpecFieldsUsecase {
  constructor(private _categoriesRepository: CategoriesRepository) {}

  execute(specFieldIDs: number[]): Observable<void> {
    return this._categoriesRepository.DeleteCategorySpecFields(specFieldIDs);
  }
}
