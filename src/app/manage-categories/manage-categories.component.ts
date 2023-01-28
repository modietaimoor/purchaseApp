import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CategoryFieldType, CategoryModel } from "@domain/models/categories";
import { AddCategorySpecFieldUsecase } from "@domain/repositories/usecases/categories/add-category-spec-fields.usecase";
import { AddNewCategoryUsecase } from "@domain/repositories/usecases/categories/add-new-category.usecase";
import { DeleteCategorySpecFieldsUsecase } from "@domain/repositories/usecases/categories/delete-category-spec-fields.usecase";
import { GetAllCategoriesUsecase } from "@domain/repositories/usecases/categories/get-all-categories.usecase";
import { Column } from "@shared/components/grid/model";
import { NotificationService } from "@shared/service/notification.service";

@Component({
  selector: "app-manage-categories",
  templateUrl: "./manage-categories.component.html",
})
export class ManageCategoriesComponent implements OnInit {
  constructor(private _getAllCategoriesUsecase: GetAllCategoriesUsecase,
    private _addNewCategoryUsecase: AddNewCategoryUsecase,
    private _addCategorySpecFieldUsecase: AddCategorySpecFieldUsecase,
    private _deleteCategorySpecFieldsUsecase: DeleteCategorySpecFieldsUsecase,  
    private _notificationService: NotificationService) {}
  categoryName: string;
  subCategoryName: string;
  fieldName: string;
  fieldType: string = 'Text';
  isMandatory: FormControl = new FormControl({
    checked: false,
    name: 'Required'
  });
  types = [CategoryFieldType.Text, 
    CategoryFieldType.Year, 
    CategoryFieldType.MonthYear, 
    CategoryFieldType.DayMonthYear, 
    CategoryFieldType.Number, 
    CategoryFieldType.YesNo];
  parentID: number;
  selectTabIndex = 0;
  categories: CategoryModel[];
  selectedCategory: CategoryModel;
  selectedCategories: CategoryModel[];
  categoryColumns: Column[] = [
    { dataField: 'categoryName', name: 'Category Name', alignment: 'center' },
    { dataField: 'parentName', name: 'Parent Category', alignment: 'center' },
    { dataField: 'creationDate', name: 'Creation Date', alignment: 'center', 
      type: 'date', format: 'dd-MM-yyyy', allowHeaderFiltering: false, allowSearch: false }
  ];

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() : void {
    this._getAllCategoriesUsecase.execute().subscribe(x => {
      this.categories = x;
      if(this.selectedCategory) {
        this.selectedCategory = this.categories.find(x => x.categoryID === this.selectedCategory.categoryID)
      }
    });
  }

  selectedRows(rows: CategoryModel[]): void {
    this.selectedCategories = rows;
  }

  selectedNode(node: { itemData: CategoryModel }): void {
    this.categoryName = null;
    this.selectedCategory = node.itemData;
  }

  addNewCategory(): void {
    if(!this.categoryName){
        this._notificationService.error("Please enter category name");
        return;
    }
    this._addNewCategoryUsecase.execute(this.categoryName).subscribe(() => {
        this._notificationService.success("Category added successfully");
        this.categoryName = null;
        this.getAllCategories();
    });
  }

  addNewChildCategory(parentID: number): void {
    if(!this.subCategoryName){
        this._notificationService.error("Please enter category name");
        return;
    }
    this._addNewCategoryUsecase.execute(this.subCategoryName, parentID).subscribe(() => {
        this._notificationService.success("Child Category added successfully");
        this.categoryName = null;
        this.getAllCategories();
    });
  }

  addNewCategorySpecField(): void {
    if(!this.selectedCategory?.categoryID){
        this._notificationService.error("Please select a category");
        return;
    }
    if(!this.fieldName){
        this._notificationService.error("Name is missing");
        return;
    }
    if(!this.fieldType){
        this._notificationService.error("Type is missing");
        return;
    }
    this._addCategorySpecFieldUsecase.execute(this.selectedCategory.categoryID, this.fieldName, this.fieldType, this.isMandatory.value.checked).subscribe(() => {
        this._notificationService.success("Category Product Specification added successfully");
        this.getAllCategories();
    });
  }

  deleteCategorySpecField(specFieldID: number): void {
    this._deleteCategorySpecFieldsUsecase.execute([specFieldID]).subscribe(() =>{
      this._notificationService.success('Category Product Specification deleted successfully');
      this.getAllCategories();
    });
  }
}
