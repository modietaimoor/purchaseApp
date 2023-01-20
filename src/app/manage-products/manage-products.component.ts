import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ManageProductService } from "./manage-products.service";

@Component({
  selector: "app-manage-product",
  templateUrl: "./manage-products.component.html",
  styleUrls: ["./manage-products.component.css"]
})
export class ManageProductComponent implements OnInit {
  productsList: any = [];
  photosArray: any = [];
  sizes: any = [];
  categories: any = [];
  showNewProductModal: boolean = false;
  ImageSelected: boolean = false;
  openTab: number = 1;
  sizeDropDownShown: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = "";
  imageFile: any;
  productFormGroup: UntypedFormGroup = new UntypedFormGroup({
    productCode: new UntypedFormControl('', Validators.required),
    productName: new UntypedFormControl('', Validators.required),
    productDescription: new UntypedFormControl('', Validators.required),
    productPrice: new UntypedFormControl('', Validators.required),
    productPhoto: new UntypedFormControl('')
  });

  constructor(private _manageProductService: ManageProductService) {}

  ngOnInit() {
    this.getAllSizes();
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllSizes() {
    this._manageProductService.getAllSizes().subscribe(res => { this.sizes = res; }, err => console.log(err));
  }

  getAllCategories() {
    this._manageProductService.getAllCategories().subscribe(res => { this.categories = res; }, err => console.log(err));
  }

  getAllProducts() {
    this._manageProductService.getProductsPhotos().subscribe(respo => {
      this.photosArray = respo;
      this._manageProductService.getAllProducts().subscribe(res => {
        this.productsList = res;
        for (var i = 0; i < this.productsList.length; i++) {
          this.productsList[i].Selected = false;
          this.productsList[i].PhotoBody = this.photosArray.find((xx: any) => xx.ProductID == this.productsList[i].ID)?.PhotoBody;
        }
      }, err => console.log(err));
    }, err => console.log(err));
  }

  showHideNewProductModal(showModal: boolean): void {
    this.ImageSelected = false;
    this.openTab = 1;
    this.sizeDropDownShown = false;
    this.showNewProductModal = showModal;
    this.imageFile = null;
  }

  uploadPhoto($event: any): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    this.imageFile = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    this.ImageSelected = true;
    myReader.addEventListener('loadend', (event: any) => {
      this.productFormGroup.value.productPhoto = event.target.result;
    });
    myReader.readAsDataURL(this.imageFile);
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

  OneSizeSelected(): boolean {
    return this.sizes.filter((xx: any) => xx.Selected == true).length > 0;
  }

  OneCategorySelected(): boolean {
    return this.categories.filter((xx: any) => xx.Selected == true).length > 0;
  }

  OneProductSelected(): boolean {
    return this.productsList && this.productsList.filter((xx: any) => xx.Selected == true).length > 0;
  }

  showAlertMessage(): void { }

  saveProduct(): void {
    if (!this.OneSizeSelected()) {
      alert("Please Select At Least One Size");
      return;
    }
    if (!this.OneCategorySelected()) {
      alert("Please Select At Least One Category");
      return;
    }
    this._manageProductService.productCodeExists(this.productFormGroup.value.productCode).subscribe(res => {
      if (res == true) {
        alert("Product Code Already Exists");
        return;
      }
      let productModel = {
        ProductCode: this.productFormGroup.value.productCode,
        ProductName: this.productFormGroup.value.productName,
        ProductDescription: this.productFormGroup.value.productDescription,
        ProductPrice: this.productFormGroup.value.productPrice,
        ProductSizes: this.sizes.filter((xx: any) => xx.Selected == true),
        ProductCategories: this.categories.filter((xx: any) => xx.Selected == true)
      }

      this._manageProductService.saveProduct(productModel, this.imageFile).subscribe(res => {
        alert("Success");
        this.productsList = [];
        this.photosArray = [];
        this.showHideNewProductModal(false);
        this.getAllProducts();
      }, err => console.log(err));
    }, err => console.log(err));
    
  }


  deleteSelectedProducts(): void {
    let selectedProducts = this.productsList.filter((xx: any) => xx.Selected == true).map((x: any) => { return x.ID } );
    this._manageProductService.deleteProducts(selectedProducts).subscribe(res => {
      alert("Success");
      this.productsList = [];
      this.photosArray = [];
      this.getAllProducts();
    }, err => console.log(err));
  }
}
