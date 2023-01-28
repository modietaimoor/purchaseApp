import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "@domain/models/categories";
import { ProductGridModel } from "@domain/models/products";
import { GetAllCategoriesUsecase } from "@domain/repositories/usecases/categories/get-all-categories.usecase";
import { GetAllProductsUsecase } from "@domain/repositories/usecases/products/get-all-products.usecase";
import { Column } from "@shared/components/grid/model";
import { ModalService } from "@shared/components/modal/modal.service";
import { NotificationService } from "@shared/service/notification.service";
import { AddProductComponent } from "./add-product/add-product.component";
import { ManageProductService } from "./manage-products.service";

@Component({
  selector: "app-manage-product",
  templateUrl: "./manage-products.component.html"
})
export class ManageProductComponent implements OnInit {
  productsList: ProductGridModel[];
  selectedProducts: ProductGridModel[];
  categories: CategoryModel[];
  productColumns: Column[] = [
    { dataField: 'productName', name: 'Product Name', alignment: 'center' },
    { dataField: 'categoryName', name: 'Product Category', alignment: 'center' },
    { dataField: 'productPrice', name: 'Price', alignment: 'right', type: 'currency' },
    { dataField: 'creationDate', name: 'Creation Date', alignment: 'center', 
      type: 'date', format: 'dd-MM-yyyy', allowHeaderFiltering: false, allowSearch: false }
  ];

  constructor(private _getAllProductsUsecase: GetAllProductsUsecase,     
    private _notificationService: NotificationService,
    private _getAllCategoriesUsecase: GetAllCategoriesUsecase,
    private _manageProductsService: ManageProductService,
    private _modalService: ModalService) {}

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  selectedRows(rows: ProductGridModel[]) {
    this.selectedProducts = rows;
  }

  getAllProducts() {
    this.productsList = [];
    this._manageProductsService.getAllProducts().subscribe(res => (this.productsList = res), err => console.log(err));
  }

  getAllCategories() {
    this._getAllCategoriesUsecase.execute().subscribe(res => (this.categories = res), err => console.log(err));
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
      componentParams: { categories: this.categories }
    });    
    modal.onClose.subscribe(x => {
      if(x.result){
        this.getAllProducts();
      }
    });
  }

  deleteSelectedProducts(): void {
    this._manageProductsService.deleteProducts(this.selectedProducts.map(x => { return x.productID})).subscribe(res => {
      this._notificationService.success("Product deleted successfully");
      this.getAllProducts();
    }, err => console.log(err));
  }
}
