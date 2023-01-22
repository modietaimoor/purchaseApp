import { Component, OnInit } from "@angular/core";
import { ProductModel } from "@domain/models/products";
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
  productsList: ProductModel[];
  selectedProducts: ProductModel[];
  productColumns: Column[] = [
    { dataField: 'productCode', name: 'Product Number', alignment: 'center'},
    { dataField: 'productName', name: 'Produt Name', alignment: 'center' },
    { dataField: 'productDescription', name: 'Description', alignment: 'center' },
    { dataField: 'productPrice', name: 'Product Price', alignment: 'right', type: 'currency' },
    { dataField: 'creationDate', name: 'Creation Date', alignment: 'center', type: 'date', format: 'dd-MM-yyyy' },
    { dataField: 'productID', name: 'Photo', alignment: 'center', type: 'custom' }
  ];

  constructor(private _manageProductService: ManageProductService, 
    private _notificationService: NotificationService,
    private _modalService: ModalService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  selectedRows(rows: ProductModel[]) {
    this.selectedProducts = rows;
  }

  getAllProducts() {
    this._manageProductService.getAllProducts().subscribe(res => {
      this.productsList = res.map(x => {
        return {
          id: x.ID,
          productName: x.ProductName,
          productDescription: x.ProductDescription,
          productCode: x.ProductCode,
          creationDate: x.CreationDate,
          productPrice: x.ProductPrice,
          productSizes: x.ProductSizes.map(y => { return {
            sizeCode: y.SizeCode,
            sizeDescription: y.SizeDescription
          }}),
          productCategories: x.ProductCategories.map(y => { return {
            categoryID: y.CategoryID,
            categoryName: y.CategoryName
          }}),    
          productPhoto: x.ProductPhoto        
        }
      });
    }, err => console.log(err));
  }

  showNewProductModal(): void {
    const modal = this._modalService.create<AddProductComponent>({
      content: AddProductComponent,
      width: 80,
      title: 'Add New Product'
    });
    modal.onClose.subscribe(x => {
      if(x.result){
        this.getAllProducts();
      }
    });
  }

  deleteSelectedProducts(): void {
    this._manageProductService.deleteProducts(this.selectedProducts.map(x => { return x.id})).subscribe(res => {
      this._notificationService.success("Product deleted successfully");
      this.productsList = [];
      this.getAllProducts();
    }, err => console.log(err));
  }
}
