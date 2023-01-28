import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesRepository } from '@domain/repositories/categories.repository';

@Injectable({
  providedIn: 'root'
})
export class AddCategorySpecFieldUsecase {
  constructor(private _categoriesRepository: CategoriesRepository) {}

  execute(categoryID: number, fieldName: string, fieldType: string, isMandatory: boolean): Observable<void> {
    return this._categoriesRepository.AddCategorySpecField(categoryID, fieldName, fieldType, isMandatory);
  }
}
