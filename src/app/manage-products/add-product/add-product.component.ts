import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "@shared/service/notification.service";
import { ModalRef, ModalService } from "@shared/components/modal/modal.service";
import { PhotoModel, ProductValidationModel, ProductValidationResult, QuantityType, QuantityTypeModel } from "@domain/models/products";
import { ManageProductService } from "../manage-products.service";
import { Subscription } from "rxjs";
import { CategoryModel } from "@domain/models/categories";
import { FileUploaderComponent } from "@shared/components/file-uploader/file-uploader.component";
import { GalleryComponent } from "@shared/components/gallery/gallery.component";
import { DropDownTemplateType } from "@shared/components/dropdown-box/template-type";
import { ProductSpecificationsComponent } from "./product-specifications/product-specifications.component";


@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit, OnDestroy {
    @ViewChild(FileUploaderComponent) fileUploader: FileUploaderComponent;
    @ViewChild(GalleryComponent) gallery: GalleryComponent;
    @ViewChild(ProductSpecificationsComponent) specsController: ProductSpecificationsComponent;
    @Input() categories: CategoryModel[];
    productCategory: CategoryModel;
    allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
    size = { height: '60%', width: '60%' };
    quantityType: number;
    productName: string;
    productPrice: number;
    imageFiles: Array<PhotoModel> = [];
    validateProdObj: ProductValidationModel;
    quantityTypes: QuantityTypeModel[] = [
        { id:QuantityType.ByQuantity, name: 'By Quantity' },
        { id:QuantityType.ByWeight, name: 'By Weight' } ];
    
                
    ImageSelected: boolean = false;
    selectTabIndex: number = 0;
    templateViewType: DropDownTemplateType = DropDownTemplateType.TreeView;
    resSubscription: Subscription;
    closeReqSubscription: Subscription;
    
    constructor(private _modalRef: ModalRef,
        private _notificationService: NotificationService,
        private _manageProductService: ManageProductService,
        private _modalService: ModalService) {}

    ngOnInit(): void {
        this.resSubscription = this._modalService.getResult().subscribe(x => console.log(x));
        this.closeReqSubscription = this._modalService.closeRequest.subscribe(() => {
            this.saveProduct();
          });
    }

    ngOnDestroy(): void {
        this.resSubscription.unsubscribe();
        this.closeReqSubscription.unsubscribe();
    }

    updateProductPhotos(e: Array<File>): void {
        if(e?.length > 0){
            e.forEach(element => {
                var fileURL = URL.createObjectURL(element);
                this.imageFiles.push({ imageSrc: fileURL, name: element.name, file: element });
            });
        }
    }

    updateProductCategory(e: number): void {
        this.productCategory = this.categories.find(x => x.categoryID == e);
    }

    closeModal(res: boolean): void {
        this._modalRef.close(res);
    }

    toggleTabs(tabNumber: number): void {
        this.selectTabIndex = tabNumber;
    }

    saveProduct(): void {
        this.validateProdObj = this._manageProductService.validateProductData(this.productName, 
            this.productPrice, 
            this.productCategory, 
            this.quantityType, 
            this.specsController?.productSpecs);
        if(this.validateProdObj.result === ProductValidationResult.Invalid)     return;
        
        this._manageProductService.saveProduct(this.productName, this.productPrice, this.productCategory, 
            this.quantityType, this.imageFiles, this.specsController?.productSpecs)
        .subscribe(res => {
            this._notificationService.success("Product Saved Successfully");
            this.closeModal(true);
        }, err => console.log(err));
    }
}
