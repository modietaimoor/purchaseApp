import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesRepository } from '@domain/repositories/categories.repository';
import { map } from 'rxjs/operators';
import { Category } from '@domain/models/categories';

@Injectable({
  providedIn: 'root'
})
export class GetAnestorCategoriesUsecase {
  constructor(private _categoriesRepository: CategoriesRepository) {}

  execute(): Observable<Category[]> {
    return this._categoriesRepository.GetAncestorCategories().pipe(map(res => 
      res.map(x => {
          return {
            categoryID: x.CategoryID,
            categoryName: x.CategoryName,
            parentID: x.ParentID,
            parentName: x.ParentName,
            creationDate: x.CreationDate,
            retired: x.Retired,
            retireDate: x.RetireDate
          }
        })
      )
    )
  }
}
