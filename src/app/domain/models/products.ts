export interface SizeModel {
    sizeCode: string;
    sizeDescription: string;
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
    productPhoto: any[];
    productSizes: Array<SizeModel>;
    productCategories: Array<CategoryModel>;
}