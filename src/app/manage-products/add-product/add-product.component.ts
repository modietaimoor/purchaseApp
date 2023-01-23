import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NotificationService } from "@shared/service/notification.service";
import { SafeAny, SafeHardAny } from "@core/safe-any-type";
import { ModalRef, ModalService } from "@shared/components/modal/modal.service";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { CategoryModel, NewProductPhoto, SizeModel } from "@domain/models/products";
import { ManageProductService } from "../manage-products.service";
import { Subscription } from "rxjs";


@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit, OnDestroy {
    @Input() createdProductsCodes: string[];
    productFormGroup: UntypedFormGroup = new UntypedFormGroup({
        productCode: new UntypedFormControl('', Validators.required),
        productName: new UntypedFormControl('', Validators.required),
        productDescription: new UntypedFormControl('', Validators.required),
        productPrice: new UntypedFormControl('', Validators.required)
    });
    sizes: SizeModel[];
    categories: CategoryModel[];
    ImageSelected: boolean = false;
    selectTabIndex: number = 0;
    imageFile: NewProductPhoto;
    subscription: Subscription;

    constructor(private _modalRef: ModalRef,
        private _notificationService: NotificationService,
        private _manageProductService: ManageProductService,
        private _modalService: ModalService) {}

    ngOnInit(): void {
        this.subscription = this._modalService.getResult().subscribe(x => console.log(x));
        this.getAllCategories();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getAllCategories() {
        this._manageProductService.getAllCategories().subscribe(res => { 
            this.categories = res.map(x => { 
            return {
                categoryID: x.CategoryID,
                categoryName: x.CategoryName
            }});
        }, err => console.log(err));
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
        if(this.createdProductsCodes?.length > 0 && this.createdProductsCodes.any(x => x == this.productFormGroup.value.productCode)){
            this._notificationService.error("Product Code Already Exists");
            return;
        }
        let productModel = {
            ProductCode: this.productFormGroup.value.productCode,
            ProductName: this.productFormGroup.value.productName,
            ProductDescription: this.productFormGroup.value.productDescription,
            ProductPrice: this.productFormGroup.value.productPrice
        }

        this._manageProductService.saveProduct(productModel, this.imageFile?.file).subscribe(res => {
            this._notificationService.success("Product saved successfully");
            this.closeModal(true);
        }, err => console.log(err));
    }
}
