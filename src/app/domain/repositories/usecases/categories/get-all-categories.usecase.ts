import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesRepository } from '@domain/repositories/categories.repository';
import { map } from 'rxjs/operators';
import { CategoryModel } from '@domain/models/categories';

@Injectable({
  providedIn: 'root'
})
export class GetAllCategoriesUsecase {
  constructor(private _categoriesRepository: CategoriesRepository) {}

  execute(): Observable<CategoryModel[]> {
    return this._categoriesRepository.GetAllCategories().pipe(map(res => 
        res.CategoriesList.map(x => {
            return {
                categoryID: x.CategoryID,
                categoryName: x.CategoryName,
                parentID: x.ParentID,
                parentName: x.ParentName,
                creationDate: x.CreationDate,
                specFields : res.SpecFieldsList.filter(y => y.CategoryID === x.CategoryID).map(y => {
                  return {
                    specFieldID: y.SpecFieldID,
                    fieldName: y.FieldName,
                    fieldType: y.FieldType,
                    isMandatory: y.IsMandatory
                  }                  
                })
            };
        }))
    );
  }
}
