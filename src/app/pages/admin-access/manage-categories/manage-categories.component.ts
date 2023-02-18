import { Component, OnInit } from "@angular/core";
import { SafeObjectAny } from "@core/safe-any-type";
import { CategoryFieldType, Category } from "@domain/models/categories";
import { Column } from "@shared/components/grid/model";
import { ModalService } from "@shared/components/modal/modal.service";
import { ConfirmationService } from "@shared/service/confirmation.service";
import { NotificationService } from "@shared/service/notification.service";
import { ManageProductComponent } from "../manage-products/manage-products.component";
import { ManageCategoryService } from "./manage-categories.service";

@Component({
  selector: "app-manage-categories",
  templateUrl: "./manage-categories.component.html",
})
export class ManageCategoriesComponent implements OnInit {
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
  categories: Category[];
  selectedCategoryChildren: Category[];
  selectedCategory: Category;
  categoryColumns: Column[] = [
    { dataField: 'categoryName', name: 'Category Name', alignment: 'center', allowUpdating: true },
    { dataField: 'parentName', name: 'Parent Category', alignment: 'center' },
    { dataField: 'creationDate', name: 'Creation Date', alignment: 'center', 
      type: 'date', format: 'dd-MM-yyyy', allowHeaderFiltering: false, allowSearch: false }
  ];

  constructor(private _manageCategoryService: ManageCategoryService,    
    private _notificationService: NotificationService,
    private _modalService: ModalService,
    private _confirmationService: ConfirmationService) {}
    
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

  selectedNode(node: { itemData: Category }): void {
    this.categoryName = null;
    this.selectedCategory = node.itemData;
    this.getCategoryChildren();
  }

  getCategoryChildren(): void {
    this._manageCategoryService.getCategoryChildren(this.selectedCategory.categoryID).subscribe(res => (this.selectedCategoryChildren = res));
  }

  viewCategoryProduct(): void {
    if(this.selectedCategory?.categoryID){
      this._modalService.create<ManageProductComponent>({
        content: ManageProductComponent,
        width: 60,
        height: 400,
        title: this.selectedCategory.categoryName + ' Products',
        cancelText: 'Close',
        showConfirmButton: false,
        componentParams: { insideModal: true, categoryID: this.selectedCategory.categoryID }
      });
    }
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

  updatCategoryName(e: SafeObjectAny): void {
    if(!e.newData.categoryName || e.newData.categoryName === ''){
        this._notificationService.error("Please enter category name");
        return;
    }
    if(this.categories?.any(x => x.categoryName === e.newData.categoryName)) {
        this._notificationService.error("Name is missing");
        return;
    }
    this._manageCategoryService.updateCategoryName(e.key.categoryID, e.newData.categoryName)
    .subscribe(() => {
        this._notificationService.success("Category Name updated successfully");
        this.getAllCategories();
    });
  }

  deleteCategory(e: SafeObjectAny): void {
    e.cancel = this._confirmationService.confirm('Delete Category', 'Deleting Category [' + e.key.categoryName +'] and all its child categories. Proceed ?').subscribe(res => {
      if(res){
        this._manageCategoryService.deleteCategory(e.key.categoryID).subscribe(() =>{
            this._notificationService.success('Category deleted successfully');
            this.getAllCategories();
          });
      }
      else{
        e.component.cancelEditData();
      }
      return !res;
    });
  }   

  rowPrepared(event: SafeObjectAny): void {
    if(event.rowType === 'data'){
      if(event.data.retired === true){
        event.rowElement.classList?.add('font-red');
      }
    }
  }
}
