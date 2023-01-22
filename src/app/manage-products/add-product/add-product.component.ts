import { Component, Input, OnInit } from "@angular/core";
import { NotificationService } from "@shared/service/notification.service";
import { SafeAny, SafeHardAny } from "@core/safe-any-type";
import { ModalRef } from "@shared/components/modal/modal.service";
import { FormArray, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { CategoryModel, NewProductPhoto, SizeModel } from "@domain/models/products";
import { ManageProductService } from "../manage-products.service";


@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
    @Input() createdProductsCodes: string[];
    productFormGroup: UntypedFormGroup = new UntypedFormGroup({
        productCode: new UntypedFormControl('', Validators.required),
        productName: new UntypedFormControl('', Validators.required),
        productDescription: new UntypedFormControl('', Validators.required),
        productPrice: new UntypedFormControl('', Validators.required)
    });
    sizes: SizeModel[];
    categories: CategoryModel[];
    selectedSizes: SizeModel[];
    selectedCategories: CategoryModel[];
    chkSizes: FormArray = new FormArray([]);
    chkCategories: FormArray = new FormArray([]);
    ImageSelected: boolean = false;
    selectTabIndex: number = 0;
    imageFile: NewProductPhoto;
    constructor(private _modalRef: ModalRef,
        private _notificationService: NotificationService,
        private _manageProductService: ManageProductService) {}

    ngOnInit(): void {
        this.getAllSizes();
        this.getAllCategories();
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

    toggleProductCategory = (event): void => {    
        this.selectedCategories = event.filter(x => x.checked === true).map(x => { return { categoryID: x.id, categoryName: x.name}});
    }

    toggleProductSize = (event): void => {
        this.selectedSizes = event.filter(x => x.checked === true).map(x => { return { sizeCode: x.id, sizeDescription: x.name}});
    }

    removePhoto() {
        this.productFormGroup.value.productPhoto = null;
        this.imageFile = null;
        this.ImageSelected = false;
    }

    uploadPhoto($event: { target: SafeAny }): void {
        this.readThis($event.target);
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

    closeModal(res: boolean): void {
        this._modalRef.close(res);
    }

    toggleTabs(tabNumber: number): void {
        this.selectTabIndex = tabNumber;
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
        if(this.createdProductsCodes?.length > 0 && this.createdProductsCodes.any(x => x == this.productFormGroup.value.productCode)){
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
            this.closeModal(true);
        }, err => console.log(err));
    }
}
