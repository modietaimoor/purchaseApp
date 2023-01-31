import { Component, OnInit } from "@angular/core";
import { CategoryFieldType, CategoryModel } from "@domain/models/categories";
import { Column } from "@shared/components/grid/model";
import { NotificationService } from "@shared/service/notification.service";
import { ManageCategoryService } from "./manage-categories.service";

@Component({
  selector: "app-manage-categories",
  templateUrl: "./manage-categories.component.html",
})
export class ManageCategoriesComponent implements OnInit {
  constructor(private _manageCategoryService: ManageCategoryService,
    private _notificationService: NotificationService) {}
  categoryName: string;
  subCategoryName: string;
  fieldName: string;
  fieldType: string = 'Text';
  isMandatory: boolean = false;
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
    this._manageCategoryService.getAllCategories().subscribe(x => {
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
    this._manageCategoryService.addNewCategory(this.categoryName).subscribe(() => {
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
    this._manageCategoryService.addNewCategory(this.subCategoryName, parentID).subscribe(() => {
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
    this._manageCategoryService.addCategorySpecField(this.selectedCategory.categoryID, this.fieldName, this.fieldType, this.isMandatory)
    .subscribe(() => {
        this._notificationService.success("Category Product Specification added successfully");
        this.getAllCategories();
    });
  }

  deleteCategorySpecField(specFieldID: number): void {
    this._manageCategoryService.deleteCategorySpecFields([specFieldID]).subscribe(() =>{
      this._notificationService.success('Category Product Specification deleted successfully');
      this.getAllCategories();
    });
  }
}
