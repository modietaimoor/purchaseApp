import { SafeAny } from "@core/safe-any-type";

export interface SizeModel {
    sizeCode: string;
    sizeDescription: string;
}

export interface ProductPhotoModel {
    productID: number;
    photoBody: SafeAny;
}

export interface NewProductPhoto {
    link: string; 
    file: Blob; 
    name: string;
}

export interface CategoryModel {
    categoryID: number;
    categoryName: string;
}

export interface ProductModel {
    id: number;
    creationDate: Date;
    productCode: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productPhoto?: SafeAny;
    productSizes: Array<SizeModel>;
    productCategories: Array<CategoryModel>;
}