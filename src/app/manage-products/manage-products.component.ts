import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { SafeAny, SafeHardAny } from "@core/safe-any-type";
import { CategoryModel, NewProductPhoto, ProductModel, ProductPhotoModel, SizeModel } from "@domain/models/products";
import { Column } from "@shared/components/grid/model";
import { ModalService } from "@shared/components/modal/modal.service";
import { NotificationService } from "@shared/service/notification.service";
import { AddProductComponent } from "./add-product/add-product.component";
import { ManageProductService } from "./manage-products.service";

@Component({
  selector: "app-manage-product",
  templateUrl: "./manage-products.component.html",
  styleUrls: ["./manage-products.component.css"]
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
  sizes: SizeModel[];
  categories: CategoryModel[];
  selectedSizes: SizeModel[];
  selectedCategories: CategoryModel[];
  chkSizes: FormArray = new FormArray([]);
  chkCategories: FormArray = new FormArray([]);
  photoArray: ProductPhotoModel[];
  ImageSelected: boolean = false;
  openTab: number = 1;
  sizeDropDownShown: boolean = false;
  imageFile: NewProductPhoto;
  productFormGroup: UntypedFormGroup = new UntypedFormGroup({
    productCode: new UntypedFormControl('', Validators.required),
    productName: new UntypedFormControl('', Validators.required),
    productDescription: new UntypedFormControl('', Validators.required),
    productPrice: new UntypedFormControl('', Validators.required)
  });

  constructor(private _manageProductService: ManageProductService, 
    private _notificationService: NotificationService,
    private _modalService: ModalService) {}

  ngOnInit() {
    this.getAllSizes();
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllSizes() {
    this._manageProductService.getAllSizes().subscribe(res => { 
      this.sizes = res.map(x => { 
        this.chkSizes.push(
          new FormControl({
            id: x.SizeCode,
            checked: false,
            name: x.SizeDescription
          })
        );
        this.chkSizes.valueChanges.subscribe(value => this.toggleProductSize(value));
        return {
        sizeCode: x.SizeCode,
        sizeDescription: x.SizeDescription
      }});
     }, err => console.log(err));
  }

  getAllCategories() {
    this._manageProductService.getAllCategories().subscribe(res => { 
      this.categories = res.map(x => { 
        this.chkCategories.push(
          new FormControl({
            id: x.CategoryID,
            checked: false,
            name: x.CategoryName
          })
        );
        this.chkCategories.valueChanges.subscribe(value => this.toggleProductCategory(value));
        return {
        categoryID: x.CategoryID,
        categoryName: x.CategoryName
      }});
    }, err => console.log(err));
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

  uploadPhoto($event: { target: SafeAny }): void {
    this.readThis($event.target);
  }

  toggleProductCategory = (event): void => {    
    this.selectedCategories = event.filter(x => x.checked === true).map(x => { return { categoryID: x.id, categoryName: x.name}});
  }

  toggleProductSize = (event): void => {
    this.selectedSizes = event.filter(x => x.checked === true).map(x => { return { sizeCode: x.id, sizeDescription: x.name}});
  }

  readThis(inputValue: SafeAny): void {
    var reader: FileReader = new FileReader();
    this.ImageSelected = true;
    reader.onload = (_event: SafeHardAny) => {
      this.imageFile = {
          link: _event.target.result,
          file: inputValue.files[0],
          name: inputValue.files[0].name
        };
    };
    reader.readAsDataURL(inputValue.files[0]);
  }

  removePhoto() {
    this.productFormGroup.value.productPhoto = null;
    this.imageFile = null;
    this.ImageSelected = false;
  }

  toggleTabs(tabNumber: number): void {
    this.openTab = tabNumber;
  }

  toggleSizeDropDown(): void {
    this.sizeDropDownShown = !this.sizeDropDownShown;
  }

  saveProduct(): void {
    if (!this.selectedSizes || this.selectedSizes.length === 0) {
      this._notificationService.error("Please Select At Least One Size");
      return;
    }
    if (!this.selectedCategories || this.selectedCategories.length === 0) {
      this._notificationService.error("Please Select At Least One Category");
      return;
    }
    this._manageProductService.productCodeExists(this.productFormGroup.value.productCode).subscribe(res => {
      if (res == true) {
        this._notificationService.error("Product Code Already Exists");
        return;
      }
      let productModel = {
        ProductCode: this.productFormGroup.value.productCode,
        ProductName: this.productFormGroup.value.productName,
        ProductDescription: this.productFormGroup.value.productDescription,
        ProductPrice: this.productFormGroup.value.productPrice,
        ProductSizes: this.selectedSizes.map(xx => { return { SizeCode: xx.sizeCode, SizeDescription: xx.sizeDescription }}),
        ProductCategories: this.selectedCategories.map(xx => { return { CategoryID: xx.categoryID, CategoryName: xx.categoryName }})
      }

      this._manageProductService.saveProduct(productModel, this.imageFile.file).subscribe(res => {
        this._notificationService.success("Product saved successfully");
        this.productsList = [];
        //this.photosArray = [];
        this.getAllProducts();
      }, err => console.log(err));
    }, err => console.log(err));
    
  }


  deleteSelectedProducts(): void {
    this._manageProductService.deleteProducts(this.selectedProducts.map(x => { return x.id})).subscribe(res => {
      this._notificationService.success("Product deleted successfully");
      this.productsList = [];
      //this.photosArray = [];
      this.getAllProducts();
    }, err => console.log(err));
  }
}
