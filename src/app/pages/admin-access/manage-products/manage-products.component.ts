import { Component, Input, OnInit } from "@angular/core";
import { Category } from "@domain/models/categories";
import { ProductGridModel } from "@domain/models/products";
import { SpecField } from "@domain/models/specfields";
import { Column } from "@shared/components/grid/model";
import { ModalService } from "@shared/components/modal/modal.service";
import { NotificationService } from "@shared/service/notification.service";
import { ManageCategoryService } from "../manage-categories/manage-categories.service";
import { SpecificationFieldsService } from "../specification-fields/specification-fields.service";
import { AddProductComponent } from "./add-product/add-product.component";
import { ManageProductService } from "./manage-products.service";

@Component({
  selector: "app-manage-product",
  templateUrl: "./manage-products.component.html"
})
export class ManageProductComponent implements OnInit {
  @Input() insideModal: boolean = false;
  @Input() categoryID: number;
  selectionMode: undefined | 'multiple';
  productsList: ProductGridModel[];
  selectedProducts: ProductGridModel[];
  categories: Category[];
  specFields: SpecField[];
  productColumns: Column[] = [
    { dataField: 'productName', name: 'Product Name', alignment: 'center' },
    { dataField: 'categoryName', name: 'Product Category', alignment: 'center' },
    { dataField: 'productPrice', name: 'Price', alignment: 'right', type: 'currency' },
    { dataField: 'creationDate', name: 'Creation Date', alignment: 'center', 
      type: 'date', format: 'dd-MM-yyyy', allowHeaderFiltering: false, allowSearch: false }
  ];

  constructor(private _notificationService: NotificationService,
    private _manageCategoriesService: ManageCategoryService,
    private _manageProductsService: ManageProductService,
    private _specificationFieldsSerivce: SpecificationFieldsService,
    private _modalService: ModalService) {}

  ngOnInit(): void {
    if(this.insideModal && this.categoryID) {
      this.getCategoryProducts();
    }
    else{
      this.selectionMode = 'multiple';
      this.getAllProducts();
      this.getAllCategories();
      this.getAllSpecFields();
    }

  }

  selectedRows(rows: ProductGridModel[]): void {
    this.selectedProducts = rows;
  }

  getAllProducts(): void {
    this.productsList = [];
    this._manageProductsService.getAllProducts().subscribe(res => (this.productsList = res), err => this._notificationService.error(err));
  }

  getCategoryProducts(): void {
    this.productsList = [];
    this._manageProductsService.getCategoryProducts(this.categoryID).subscribe(res => (this.productsList = res), err => this._notificationService.error(err));
  }

  getAllCategories(): void {
    this.categories = [];
    this._manageCategoriesService.getAllCategories().subscribe(res => (this.categories = res), err => this._notificationService.error(err));
  }

  getAllSpecFields(): void {
    this.specFields = [];
    this._specificationFieldsSerivce.getAllSpecFields().subscribe(res => (this.specFields = res), err => this._notificationService.error(err));
  }

  showNewProductModal(): void {
    const modal = this._modalService.create<AddProductComponent>({
      content: AddProductComponent,
      width: 70,
      height: 600,
      title: 'Add New Product',
      confirmText: 'Save Product',
      cancelText: 'Cancel',
      checkBeforeSubmit: true,
      showConfirmButton: true,
      componentParams: { categories: this.categories, specFields: this.specFields }
    });    
    modal.onClose.subscribe(x => {
      if(x.result){
        this.getAllProducts();
      }
    });
  }

  deleteSelectedProducts(): void {
    this._manageProductsService.deleteProducts(this.selectedProducts.map(x => { return x.productID })).subscribe(res => {
      this._notificationService.success("Product deleted successfully");
      this.getAllProducts();
    }, err => this._notificationService.error(err));
  }
}
