import { EventEmitter, Injectable } from '@angular/core';
import { CategoryModel } from '@domain/models/categories';
import { AddCategorySpecFieldUsecase } from '@domain/repositories/usecases/categories/add-category-spec-fields.usecase';
import { AddNewCategoryUsecase } from '@domain/repositories/usecases/categories/add-new-category.usecase';
import { DeleteCategorySpecFieldsUsecase } from '@domain/repositories/usecases/categories/delete-category-spec-fields.usecase';
import { GetAllCategoriesUsecase } from '@domain/repositories/usecases/categories/get-all-categories.usecase';
import { Observable } from 'rxjs';

@Injectable()
export class ManageCategoryService {
  constructor(private _getAllCategoriesUsecase: GetAllCategoriesUsecase,
    private _addNewCategoryUsecase: AddNewCategoryUsecase,
    private _addCategorySpecFieldUsecase: AddCategorySpecFieldUsecase,
    private _deleteCategorySpecFieldsUsecase: DeleteCategorySpecFieldsUsecase) { }

    updateCategory: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>();
    public getAllCategories(): Observable<CategoryModel[]> {
        return this._getAllCategoriesUsecase.execute();
    }

    public addNewCategory(categoryName: string, parentID?: number): Observable<void> {
        return this._addNewCategoryUsecase.execute(categoryName, parentID);
    }

    public addCategorySpecField(categoryID: number, fieldName: string, fieldType: string, isMandatory: boolean): Observable<void> {
        return this._addCategorySpecFieldUsecase.execute(categoryID, fieldName, fieldType, isMandatory);
    }

    public deleteCategorySpecFields(specFieldIDs: number[]): Observable<void> {
        return this._deleteCategorySpecFieldsUsecase.execute(specFieldIDs);
    }
    
    public updateSelectedCategory(category: CategoryModel) : void {
        this.updateCategory.emit(category);
    }
}
