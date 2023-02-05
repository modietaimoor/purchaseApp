import { Injectable } from '@angular/core';
import { Category } from '@domain/models/categories';
import { UpdateCategoryNameUsecase } from '@domain/repositories/usecases/categories/update-category-name.usecase';
import { AddNewCategoryUsecase } from '@domain/repositories/usecases/categories/add-new-category.usecase';
import { GetAllCategoriesUsecase } from '@domain/repositories/usecases/categories/get-all-categories.usecase';
import { DeleteCategoryUsecase } from '@domain/repositories/usecases/categories/delete-category-spec-fields.usecase';
import { Observable } from 'rxjs';
import { GetCategoryChildrenUsecase } from '@domain/repositories/usecases/categories/get-category-children.usecase';


@Injectable()
export class ManageCategoryService {
  constructor(private _getAllCategoriesUsecase: GetAllCategoriesUsecase,
    private _addNewCategoryUsecase: AddNewCategoryUsecase,
    private _updateCategoryNameUsecase: UpdateCategoryNameUsecase,
    private _deleteCategoryUsecase: DeleteCategoryUsecase,
    private _getCategoryChildrenUsecase: GetCategoryChildrenUsecase) { }

    public getAllCategories(): Observable<Category[]> {
        return this._getAllCategoriesUsecase.execute();
    }

    public addNewCategory(categoryName: string, parentID?: number): Observable<void> {
        return this._addNewCategoryUsecase.execute(categoryName, parentID);
    }

    public updateCategoryName(categoryID: number, name: string): Observable<void> {
        return this._updateCategoryNameUsecase.execute(categoryID, name);
    }

    public deleteCategory(categoryID: number): Observable<void> {
        return this._deleteCategoryUsecase.execute(categoryID);
    }

    public getCategoryChildren(categoryID: number): Observable<Category[]> {
        return this._getCategoryChildrenUsecase.execute(categoryID);
    }
}
